'use client'

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { UploadCloud, X, CheckCircle, Loader2 } from 'lucide-react';
import { type Locale } from '@/i18n.config';
import { createProperty } from '@/lib/properties';

const LocationPickerMap = dynamic(
  () => import('@/components/LocationPickerMap'),
  { ssr: false }
);

const Step1 = ({ dictionary, onNext, formData, setFormData, lang }: { dictionary: any, onNext: () => void, formData: any, setFormData: any, lang: Locale }) => {
  
  const [isGeocoding, setIsGeocoding] = useState(false);
  const apiKey = 'fFwC9Atmm5nOTMrzWgR8'; 
  const mapLang = ['ka', 'en', 'ru'].includes(lang) ? lang : 'en'; 
  const tileUrl = `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${apiKey}&lang=${mapLang}`;
  const attribution = '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  const handlePositionChange = (newPos: [number, number]) => {
      setFormData((prev: any) => ({
          ...prev,
          coordinates: { lat: newPos[0], lng: newPos[1] }
      }));
  };

  useEffect(() => {
    const fetchAddress = async () => {
        if (!formData.coordinates) return;
        setIsGeocoding(true);
        try {
            const { lat, lng } = formData.coordinates;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang}`);
            const data = await response.json();
            const address = data.address || {};
            setFormData((prev: any) => ({
                ...prev,
                city: address.city || address.town || address.village || '',
                street: address.road || '',
                houseNumber: address.house_number || ''
            }));
        } catch (error) {
            console.error("Failed to fetch address:", error);
        } finally {
            setIsGeocoding(false);
        }
    };
    
    const timer = setTimeout(() => {
        fetchAddress();
    }, 500);

    return () => clearTimeout(timer);

  }, [formData.coordinates, lang, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dictionary.step1_title}</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">{dictionary.what_to_publish}</label>
            <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
              <option>{dictionary.room}</option>
              <option>{dictionary.apartment}</option>
              <option>{dictionary.house}</option>
              <option>{dictionary.garage}</option>
              <option>{dictionary.land}</option>
              <option>{dictionary.commercial}</option>
            </select>
          </div>
          <div>
            <label htmlFor="dealType" className="block text-sm font-medium text-gray-700">{dictionary.deal_type}</label>
            <select id="dealType" name="dealType" value={formData.dealType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
              <option>{dictionary.sale}</option>
              <option>{dictionary.rent}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">{dictionary.city}</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} placeholder={dictionary.city_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">{dictionary.street}</label>
                <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange} placeholder={dictionary.street_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
            </div>
            <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">{dictionary.house_number}</label>
                <input type="text" name="houseNumber" id="houseNumber" value={formData.houseNumber} onChange={handleInputChange} placeholder={dictionary.house_number_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
            </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800">{dictionary.location_on_map}</h3>
           <p className="text-sm text-gray-600 mb-2">{dictionary.location_on_map_hint}</p>
          <LocationPickerMap 
            initialPosition={[formData.coordinates.lat, formData.coordinates.lng]}
            onPositionChange={handlePositionChange}
            tileUrl={tileUrl}
            attribution={attribution}
          />
           <div className="mt-2 text-xs text-gray-500 h-4">
            {isGeocoding && 'Определение адреса...'}
          </div>
        </div>
      </div>
    </div>
  )
};

const Step2 = ({ dictionary, onBack, onNext, formData, setFormData }: { dictionary: any, onBack: () => void, onNext: () => void, formData: any, setFormData: any }) => {
    
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const newImagePreviews = (formData.images || []).map((file: File) => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
        
        if (formData.video) {
            setVideoPreview(URL.createObjectURL(formData.video));
        } else {
            setVideoPreview(null);
        }

        return () => {
            newImagePreviews.forEach((url: string) => URL.revokeObjectURL(url));
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [formData.images, formData.video]);

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            
            // Проверяем каждый файл
            const validFiles: File[] = [];
            const errors: string[] = [];
            
            files.forEach((file, index) => {
                // Проверяем размер (максимум 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    errors.push(`Изображение "${file.name}" слишком большое (максимум 10MB)`);
                    return;
                }
                
                // Проверяем тип файла
                if (!file.type.startsWith('image/')) {
                    errors.push(`Файл "${file.name}" не является изображением`);
                    return;
                }
                
                validFiles.push(file);
            });
            
            // Показываем ошибки если есть
            if (errors.length > 0) {
                alert(errors.join('\n'));
            }
            
            // Добавляем только валидные файлы
            if (validFiles.length > 0) {
                setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), ...validFiles] }));
            }
        }
    };
    
    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Проверяем размер (максимум 100MB)
            if (file.size > 100 * 1024 * 1024) {
                alert(`Видео "${file.name}" слишком большое (максимум 100MB)`);
                return;
            }
            
            // Проверяем тип файла
            if (!file.type.startsWith('video/')) {
                alert(`Файл "${file.name}" не является видео`);
                return;
            }
            
            setFormData((prev: any) => ({ ...prev, video: file }));
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData((prev: any) => ({ ...prev, images: newImages }));
    };

    const handleRemoveVideo = () => {
        setFormData((prev: any) => ({ ...prev, video: null }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dictionary.step2_title}</h2>
            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700">{dictionary.photos}</label>
                    <p className="text-xs text-gray-500 mb-2">{dictionary.photos_hint} (максимум 10MB на файл)</p>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                    <span>{dictionary.upload_btn}</span>
                                    <input id="image-upload" type="file" className="sr-only" multiple onChange={handleImageFileChange} ref={imageInputRef} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="relative group">
                                    <img src={src} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
                                    <button onClick={() => handleRemoveImage(index)} className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                                <div>
                    <label className="block text-sm font-medium text-gray-700">{dictionary.video}</label>
                    <p className="text-xs text-gray-500 mb-2">{dictionary.video_hint} (максимум 100MB)</p>
                    {videoPreview ? (
                         <div className="relative group">
                            <video src={videoPreview} controls className="w-full rounded-md" />
                            <button onClick={handleRemoveVideo} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                        <span>{dictionary.upload_video_btn}</span>
                                        <input id="video-upload" type="file" className="sr-only" onChange={handleVideoFileChange} ref={videoInputRef} accept="video/mp4,video/mov,video/quicktime" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

const Step3 = ({ dictionary, onBack, onNext, formData, setFormData }: { dictionary: any, onBack: () => void, onNext: (e: React.FormEvent) => void, formData: any, setFormData: any }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: checked }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dictionary.step3_title}</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">{dictionary.total_area}</label>
                        <input type="number" name="area" id="area" value={formData.area} onChange={handleInputChange} placeholder="120" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="living_area" className="block text-sm font-medium text-gray-700">{dictionary.living_area}</label>
                        <input type="number" name="living_area" id="living_area" value={formData.living_area} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="kitchen_area" className="block text-sm font-medium text-gray-700">{dictionary.kitchen_area}</label>
                        <input type="number" name="kitchen_area" id="kitchen_area" value={formData.kitchen_area} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">{dictionary.rooms}</label>
                        <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleInputChange} placeholder="3" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">{dictionary.bathrooms}</label>
                        <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">{dictionary.floor}</label>
                        <input type="number" name="floor" id="floor" value={formData.floor} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="total_floors" className="block text-sm font-medium text-gray-700">{dictionary.total_floors}</label>
                        <input type="number" name="total_floors" id="total_floors" value={formData.total_floors} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                </div>

                <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">{dictionary.condition}</label>
                    <select id="condition" name="condition" value={formData.condition} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                        <option value={dictionary.condition_new}>{dictionary.condition_new}</option>
                        <option value={dictionary.condition_good}>{dictionary.condition_good}</option>
                        <option value={dictionary.condition_medium}>{dictionary.condition_medium}</option>
                        <option value={dictionary.condition_needs_repair}>{dictionary.condition_needs_repair}</option>
                        <option value={dictionary.condition_black_frame}>{dictionary.condition_black_frame}</option>
                        <option value={dictionary.condition_white_frame}>{dictionary.condition_white_frame}</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">{dictionary.windows_exit}</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input id="north" name="windowDirection" type="checkbox" value="north" checked={formData.windowDirections?.includes('north')} onChange={(e) => {
                                    const directions = formData.windowDirections || [];
                                    if (e.target.checked) {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: [...directions, 'north'] }));
                                    } else {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: directions.filter((d: string) => d !== 'north') }));
                                    }
                                }} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label htmlFor="north" className="ml-2 block text-sm text-gray-900">{dictionary.north}</label>
                            </div>
                            <div className="flex items-center">
                                <input id="south" name="windowDirection" type="checkbox" value="south" checked={formData.windowDirections?.includes('south')} onChange={(e) => {
                                    const directions = formData.windowDirections || [];
                                    if (e.target.checked) {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: [...directions, 'south'] }));
                                    } else {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: directions.filter((d: string) => d !== 'south') }));
                                    }
                                }} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label htmlFor="south" className="ml-2 block text-sm text-gray-900">{dictionary.south}</label>
                            </div>
                            <div className="flex items-center">
                                <input id="east" name="windowDirection" type="checkbox" value="east" checked={formData.windowDirections?.includes('east')} onChange={(e) => {
                                    const directions = formData.windowDirections || [];
                                    if (e.target.checked) {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: [...directions, 'east'] }));
                                    } else {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: directions.filter((d: string) => d !== 'east') }));
                                    }
                                }} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label htmlFor="east" className="ml-2 block text-sm text-gray-900">{dictionary.east}</label>
                            </div>
                            <div className="flex items-center">
                                <input id="west" name="windowDirection" type="checkbox" value="west" checked={formData.windowDirections?.includes('west')} onChange={(e) => {
                                    const directions = formData.windowDirections || [];
                                    if (e.target.checked) {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: [...directions, 'west'] }));
                                    } else {
                                        setFormData((prev: any) => ({ ...prev, windowDirections: directions.filter((d: string) => d !== 'west') }));
                                    }
                                }} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label htmlFor="west" className="ml-2 block text-sm text-gray-900">{dictionary.west}</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="maintenance_cost" className="block text-sm font-medium text-gray-700">{dictionary.maintenance_cost}</label>
                        <p className="text-xs text-gray-500 mb-2">{dictionary.maintenance_cost_hint}</p>
                        <div className="flex">
                            <input type="number" name="maintenance_cost" id="maintenance_cost" value={formData.maintenance_cost} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-l-md bg-gray-100" />
                            <select name="currency" value={formData.currency} onChange={handleInputChange} className="mt-1 block pl-3 pr-8 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-r-md bg-gray-100">
                                <option value="gel">₾</option>
                                <option value="usd">$</option>
                                <option value="eur">€</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label htmlFor="elevator" className="block text-sm font-medium text-gray-700">{dictionary.elevator}</label>
                        <select id="elevator" name="elevator" value={formData.elevator} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                            <option value="no">{dictionary.no}</option>
                            <option value="yes">{dictionary.yes}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gas" className="block text-sm font-medium text-gray-700">{dictionary.gas}</label>
                        <select id="gas" name="gas" value={formData.gas} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                            <option value="no">{dictionary.no}</option>
                            <option value="yes">{dictionary.yes}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="security" className="block text-sm font-medium text-gray-700">{dictionary.security}</label>
                        <select id="security" name="security" value={formData.security} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                            <option value="no">{dictionary.no}</option>
                            <option value="yes">{dictionary.yes}</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cctv" className="block text-sm font-medium text-gray-700">{dictionary.cctv}</label>
                        <select id="cctv" name="cctv" value={formData.cctv} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                            <option value="no">{dictionary.no}</option>
                            <option value="yes">{dictionary.yes}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">{dictionary.description}</label>
                    <p className="text-xs text-gray-500 mb-2">{dictionary.description_hint_detail}</p>
                    <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" placeholder={dictionary.description_placeholder}></textarea>
                </div>
            </div>
        </div>
    );
}

const NewPostAdForm = ({ dictionary, lang }: { dictionary: any, lang: Locale }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    propertyType: '',
    dealType: '',
    city: '',
    street: '',
    houseNumber: '',
    coordinates: { lat: 41.7151, lng: 44.8271 },
    images: [] as File[],
    video: null as File | null,
    area: '',
    living_area: '',
    kitchen_area: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    total_floors: '',
    windowDirections: [] as string[],
    condition: '',
    elevator: 'no',
    gas: 'no',
    security: 'no',
    cctv: 'no',
    description: '',
    price: '',
    maintenance_cost: '',
    currency: 'gel'
  });

  useEffect(() => {
    if (dictionary) {
      setFormData(prev => ({
        ...prev,
        propertyType: dictionary.apartment,
        dealType: dictionary.sale,
        condition: dictionary.condition_good,
      }))
    }
  }, [dictionary])

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('=== НАЧАЛО ОТПРАВКИ ФОРМЫ ===');
      console.log('Form data before submission:', formData);
      
      // Проверяем обязательные поля перед отправкой
      console.log('Проверяем обязательные поля...');
      console.log('formData.propertyType:', formData.propertyType);
      console.log('formData.city:', formData.city);
      console.log('formData.area:', formData.area, 'type:', typeof formData.area);
      console.log('formData.description:', formData.description);
      
      if (!formData.propertyType) {
        throw new Error('Не выбран тип недвижимости');
      }
      if (!formData.city) {
        throw new Error('Не указан город');
      }
      if (!formData.area || formData.area.trim() === '') {
        throw new Error('Не указана площадь');
      }
      if (!formData.description || formData.description.trim() === '') {
        throw new Error('Не заполнено описание');
      }
      
      console.log('Все обязательные поля заполнены, вызываем createProperty...');
      const propertyId = await createProperty(formData);
      console.log('Property created with ID:', propertyId);
      console.log('=== ОБЪЯВЛЕНИЕ УСПЕШНО СОЗДАНО ===');
      setIsSuccess(true);
      
      // Через 3 секунды перенаправляем на главную страницу
      setTimeout(() => {
        window.location.href = `/${lang}/`;
      }, 3000);
      
    } catch (error: any) {
      console.error('=== ОШИБКА ПРИ СОЗДАНИИ ОБЪЯВЛЕНИЯ ===');
      console.error('Error details:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      
      // Показываем более конкретное сообщение об ошибке
      let errorMessage = 'Произошла ошибка при создании объявления. Попробуйте еще раз.';
      
      if (error.message) {
        if (error.message.includes('изображений')) {
          errorMessage = `Ошибка загрузки изображений: ${error.message}`;
        } else if (error.message.includes('видео')) {
          errorMessage = `Ошибка загрузки видео: ${error.message}`;
        } else if (error.message.includes('слишком большое')) {
          errorMessage = error.message;
        } else if (error.message.includes('не является')) {
          errorMessage = error.message;
        } else if (error.message.includes('обязательные поля')) {
          errorMessage = error.message;
        } else if (error.message.includes('Firebase')) {
          errorMessage = 'Ошибка подключения к серверу. Проверьте интернет-соединение.';
        } else if (error.message.includes('Permission denied')) {
          errorMessage = 'Ошибка доступа к базе данных. Проверьте настройки Firebase.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Ошибка сети. Проверьте интернет-соединение.';
        } else {
          errorMessage = `Ошибка: ${error.message}`;
        }
      }
      
      console.error('Показываем пользователю ошибку:', errorMessage);
      setError(errorMessage);
    } finally {
      console.log('=== ЗАВЕРШЕНИЕ ОБРАБОТКИ ФОРМЫ ===');
      setIsSubmitting(false);
    }
  };

  // Функция-заглушка для Step3, так как там не нужен onNext
  const dummyNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Ничего не делаем, отправка формы обрабатывается через onSubmit формы
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 dictionary={dictionary} onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />;
      case 2:
        return <Step2 dictionary={dictionary} onBack={prevStep} onNext={nextStep} formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 dictionary={dictionary} onBack={prevStep} onNext={dummyNext} formData={formData} setFormData={setFormData} />;
      default:
        return <Step1 dictionary={dictionary} onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />;
    }
  };

  const progress = (step / 3) * 100;

  // Показываем страницу успеха
  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {dictionary.success_title || 'Объявление успешно размещено!'}
        </h2>
        <p className="text-gray-600 mb-4">
          {dictionary.success_message || 'Ваше объявление проходит модерацию и скоро появится на сайте.'}
        </p>
        <p className="text-sm text-gray-500">
          {dictionary.redirect_message || 'Через несколько секунд вы будете перенаправлены на главную страницу...'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="mb-8">
          <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-primary-700">{dictionary.step} {step} из 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-8 pt-6 border-t flex justify-between">
          {step > 1 && !isSubmitting && (
            <button
              type="button"
              onClick={prevStep}
              className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {dictionary.back_btn}
            </button>
          )}
          <div className="flex-grow"></div>
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting}
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {dictionary.next_btn}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 flex items-center"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isSubmitting ? (dictionary.publishing || 'Публикуем...') : dictionary.publish_btn}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPostAdForm; 