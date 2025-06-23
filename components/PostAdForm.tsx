'use client'

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { UploadCloud, X } from 'lucide-react';
import { type Locale } from '@/i18n.config';

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
            setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), ...files] }));
        }
    };
    
    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev: any) => ({ ...prev, video: e.target.files![0] }));
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
                    <p className="text-xs text-gray-500 mb-2">{dictionary.photos_hint}</p>
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
                    <p className="text-xs text-gray-500 mb-2">{dictionary.video_hint}</p>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">{dictionary.total_area}</label>
                        <input type="number" name="area" id="area" value={formData.area} onChange={handleInputChange} placeholder="120" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">{dictionary.rooms}</label>
                        <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleInputChange} placeholder="3" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">{dictionary.bathrooms}</label>
                        <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleInputChange} placeholder="2" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div>
                         <label htmlFor="windowDirection" className="block text-sm font-medium text-gray-700">{dictionary.windows_exit}</label>
                        <select id="windowDirection" name="windowDirection" value={formData.windowDirection} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-100">
                            <option>{dictionary.east}</option>
                            <option>{dictionary.west}</option>
                            <option>{dictionary.south}</option>
                            <option>{dictionary.north}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <h3 className="text-md font-medium text-gray-800">{dictionary.condition}</h3>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['condition_new', 'condition_good', 'condition_medium', 'condition_needs_repair', 'condition_black_frame', 'condition_white_frame'].map((feature) => (
                             <div key={feature} className="flex items-center">
                                <input id={feature} name="condition" type="radio" value={dictionary[feature]} checked={formData.condition === dictionary[feature]} onChange={handleInputChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                                <label htmlFor={feature} className="ml-2 block text-sm text-gray-900">{dictionary[feature]}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-md font-medium text-gray-800">Удобства</h3>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['has_lift', 'has_gas', 'has_internet', 'is_furnished'].map((feature) => (
                             <div key={feature} className="flex items-center">
                                <input id={feature} name={feature} type="checkbox" checked={formData[feature]} onChange={handleCheckboxChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label htmlFor={feature} className="ml-2 block text-sm text-gray-900">{dictionary[feature]}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">{dictionary.description}</label>
                     <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" placeholder={dictionary.description_placeholder}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">{dictionary.maintenance_cost}</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                     <div>
                        <label htmlFor="maintenance_cost" className="block text-sm font-medium text-gray-700">{dictionary.maintenance_cost_hint}</label>
                        <input type="number" name="maintenance_cost" id="maintenance_cost" value={formData.maintenance_cost} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const PostAdForm = ({ dictionary, lang }: { dictionary: any, lang: Locale }) => {
  const [step, setStep] = useState(1);
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
    bedrooms: '',
    bathrooms: '',
    windowDirection: '',
    condition: '',
    has_lift: false,
    has_gas: false,
    has_internet: false,
    is_furnished: false,
    description: '',
    price: '',
    maintenance_cost: ''
  });

  useEffect(() => {
    if (dictionary) {
      setFormData(prev => ({
        ...prev,
        propertyType: dictionary.apartment,
        dealType: dictionary.sale,
        windowDirection: dictionary.east,
        condition: dictionary.condition_good,
      }))
    }
  }, [dictionary])

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 dictionary={dictionary} onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />;
      case 2:
        return <Step2 dictionary={dictionary} onBack={prevStep} onNext={nextStep} formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 dictionary={dictionary} onBack={prevStep} onNext={handleSubmit} formData={formData} setFormData={setFormData} />;
      default:
        return <Step1 dictionary={dictionary} onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />;
    }
  };

  const progress = (step / 3) * 100;

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

      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="mt-8 pt-6 border-t flex justify-between">
          {step > 1 && (
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
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {dictionary.next_btn}
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {dictionary.publish_btn}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostAdForm; 