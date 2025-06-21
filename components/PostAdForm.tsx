'use client'

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { UploadCloud, X } from 'lucide-react';

const LocationPickerMap = dynamic(
  () => import('@/components/LocationPickerMap'),
  { ssr: false }
);

const Step1 = ({ dict, onNext, formData, setFormData, lang }: { dict: any, onNext: () => void, formData: any, setFormData: any, lang: string }) => {
  
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
    }, 500); // Add a small delay to avoid too many requests

    return () => clearTimeout(timer);

  }, [formData.coordinates, lang, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dict.step1_title}</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">{dict.what_to_publish}</label>
            <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
              <option>{dict.room}</option>
              <option>{dict.apartment}</option>
              <option>{dict.house}</option>
              <option>{dict.garage}</option>
              <option>{dict.land}</option>
              <option>{dict.commercial}</option>
            </select>
          </div>
          <div>
            <label htmlFor="dealType" className="block text-sm font-medium text-gray-700">{dict.deal_type}</label>
            <select id="dealType" name="dealType" value={formData.dealType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
              <option>{dict.sale}</option>
              <option>{dict.rent}</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">{dict.city}</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} placeholder={dict.city_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">{dict.street}</label>
                <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange} placeholder={dict.street_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
            </div>
            <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">{dict.house_number}</label>
                <input type="text" name="houseNumber" id="houseNumber" value={formData.houseNumber} onChange={handleInputChange} placeholder={dict.house_number_placeholder} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
            </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800">{dict.location_on_map}</h3>
           <p className="text-sm text-gray-600 mb-2">{dict.location_on_map_hint}</p>
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

const Step2 = ({ dict, onBack, onNext, formData, setFormData }: { dict: any, onBack: () => void, onNext: () => void, formData: any, setFormData: any }) => {
    
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Create previews for images
        const newImagePreviews = (formData.images || []).map((file: File) => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
        
        // Create preview for video
        if (formData.video) {
            setVideoPreview(URL.createObjectURL(formData.video));
        } else {
            setVideoPreview(null);
        }

        // Cleanup object URLs on component unmount
        return () => {
            if (Array.isArray(newImagePreviews)) {
                newImagePreviews.forEach(url => URL.revokeObjectURL(url));
            }
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [formData.images, formData.video]);

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), ...files] }));
        }
    };
    
    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFormData((prev: any) => ({ ...prev, video: files[0] }));
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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dict.step2_title}</h2>
            <div className="space-y-8">
                {/* Photo Uploader */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">{dict.photos}</label>
                    <p className="text-xs text-gray-500 mb-2">{dict.photos_hint}</p>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                                    <span>{dict.upload_btn}</span>
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

                {/* Video Uploader */}
                <div>
                     <label className="block text-sm font-medium text-gray-700">{dict.video}</label>
                    <p className="text-xs text-gray-500 mb-2">{dict.video_hint}</p>
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
                                        <span>{dict.upload_video_btn}</span>
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

const Step3 = ({ dict, onBack, onNext, formData, setFormData }: { dict: any, onBack: () => void, onNext: () => void, formData: any, setFormData: any }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            windows: {
                ...prev.windows,
                [name]: checked,
            }
        }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">{dict.step3_title}</h2>
            <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="totalArea" className="block text-sm font-medium text-gray-700">{dict.total_area}</label>
                        <input type="number" name="totalArea" id="totalArea" value={formData.totalArea} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="livingArea" className="block text-sm font-medium text-gray-700">{dict.living_area}</label>
                        <input type="number" name="livingArea" id="livingArea" value={formData.livingArea} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="kitchenArea" className="block text-sm font-medium text-gray-700">{dict.kitchen_area}</label>
                        <input type="number" name="kitchenArea" id="kitchenArea" value={formData.kitchenArea} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">{dict.rooms}</label>
                        <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">{dict.floor}</label>
                        <input type="number" name="floor" id="floor" value={formData.floor} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700">{dict.total_floors}</label>
                        <input type="number" name="totalFloors" id="totalFloors" value={formData.totalFloors} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                </div>
                
                 <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">{dict.condition}</label>
                    <select id="condition" name="condition" value={formData.condition} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                        <option>{dict.condition_new}</option>
                        <option>{dict.condition_good}</option>
                        <option>{dict.condition_medium}</option>
                        <option>{dict.condition_needs_repair}</option>
                        <option>{dict.condition_black_frame}</option>
                        <option>{dict.condition_white_frame}</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 pt-6 border-t mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{dict.windows_exit}</label>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                            {['north', 'south', 'east', 'west'].map((direction) => (
                                <label key={direction} className="flex items-center space-x-2">
                                    <input type="checkbox" name={direction} checked={formData.windows[direction]} onChange={handleCheckboxChange} className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                    <span>{dict[direction]}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="maintenance_cost" className="block text-sm font-medium text-gray-700">{dict.maintenance_cost}</label>
                        <p className="text-xs text-gray-500 mb-2">{dict.maintenance_cost_hint}</p>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input type="number" name="maintenanceCostAmount" id="maintenance_cost" value={formData.maintenanceCostAmount} onChange={handleInputChange} className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border border-gray-300 bg-gray-100 px-3" />
                            <select name="maintenanceCostCurrency" value={formData.maintenanceCostCurrency} onChange={handleInputChange} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-100 text-gray-700 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                <option value="gel">{dict.currency_gel}</option>
                                <option value="usd">{dict.currency_usd}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {['elevator', 'gas', 'security', 'cctv'].map((feature) => (
                        <div key={feature}>
                            <label htmlFor={feature} className="block text-sm font-medium text-gray-700">{dict[feature]}</label>
                            <select id={feature} name={feature} value={formData[feature]} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                                <option value="yes">{dict.yes}</option>
                                <option value="no">{dict.no}</option>
                            </select>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">{dict.description}</label>
                    <p className="text-xs text-gray-500 mb-2">{dict.description_hint_detail}</p>
                    <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleInputChange} placeholder={dict.description_placeholder} className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-gray-100"></textarea>
                </div>

            </div>
        </div>
    );
}

const PostAdForm = ({ dict, lang }: { dict: any, lang: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: dict.postAdForm.apartment,
    dealType: dict.postAdForm.sale,
    city: '',
    street: '',
    houseNumber: '',
    coordinates: { lat: 41.7151, lng: 44.8271 }, // Default to Tbilisi
    images: [] as File[],
    video: null as File | null,
    description: '',
    totalArea: '',
    livingArea: '',
    kitchenArea: '',
    rooms: '',
    floor: '',
    totalFloors: '',
    condition: dict.postAdForm.condition_good,
    windows: {
        north: false,
        south: false,
        east: false,
        west: false,
    },
    elevator: 'no',
    gas: 'yes',
    security: 'no',
    cctv: 'no',
    maintenanceCostAmount: '',
    maintenanceCostCurrency: 'gel',
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Объявление отправлено (симуляция)!');
  };

  // This is needed because the dict is passed from an async server component
  // and we need to initialize the form state with translated values.
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        propertyType: dict.postAdForm.apartment,
        dealType: dict.postAdForm.sale,
        condition: dict.postAdForm.condition_good,
        elevator: 'no',
        gas: 'yes',
        security: 'no',
        cctv: 'no',
        maintenanceCostCurrency: 'gel',
    }))
  }, [dict])

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border">
      <h2 className="text-xl font-medium mb-4 text-gray-500">
        {dict.postAdForm.step} {step} {dict.postAdForm.of} 3
      </h2>

      {step === 1 && <Step1 dict={dict.postAdForm} onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />}
      {step === 2 && <Step2 dict={dict.postAdForm} onBack={prevStep} onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 dict={dict.postAdForm} onBack={prevStep} onNext={nextStep} formData={formData} setFormData={setFormData} />}

      <div className="flex justify-between mt-8 pt-6 border-t">
        {step > 1 ? (
          <button onClick={prevStep} className="px-6 py-2 border rounded-sm text-gray-700 hover:bg-gray-50">
            {dict.postAdForm.back}
          </button>
        ) : (
            <div></div> 
        )}
        {step < 3 ? (
          <button onClick={nextStep} className="px-6 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700">
            {dict.postAdForm.next}
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-6 py-2 bg-accent-500 text-white rounded-sm hover:bg-accent-600">
            {dict.postAdForm.publish}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostAdForm; 