'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт карты с отключением SSR
const LocationPickerMap = dynamic(
  () => import('@/components/LocationPickerMap'),
  { ssr: false }
);


// Шаг 1: Тип и местоположение
const Step1 = ({ onNext, formData, setFormData, lang }: { onNext: () => void, formData: any, setFormData: any, lang: string }) => {
  
  const [isGeocoding, setIsGeocoding] = useState(false);

  // --- ВСЯ ЛОГИКА ТЕПЕРЬ ЗДЕСЬ ---
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
        setIsGeocoding(true);
        try {
            const { lat, lng } = formData.coordinates;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang}`);
            const data = await response.json();
            const address = data.address || {};
            setFormData((prev: any) => ({
                ...prev,
                city: address.city || address.town || address.village || prev.city,
                street: address.road || '',
                houseNumber: address.house_number || address.house_name || ''
            }));
        } catch (error) {
            console.error("Failed to fetch address:", error);
        } finally {
            setIsGeocoding(false);
        }
    };
    
    // Выполняем запрос только если есть координаты
    if (formData.coordinates) {
        fetchAddress();
    }
  }, [formData.coordinates, lang, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 border-b pb-3">1. Основная информация и адрес</h2>
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Что вы хотите опубликовать?</label>
            <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
              <option>Квартира</option>
              <option>Дом</option>
              <option>Гараж</option>
              <option>Земельный участок</option>
              <option>Коммерческая недвижимость</option>
            </select>
          </div>
          <div>
            <label htmlFor="dealType" className="block text-sm font-medium text-gray-700">Тип сделки</label>
            <select id="dealType" name="dealType" value={formData.dealType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
              <option>Продажа</option>
              <option>Аренда</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Населенный пункт</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} placeholder="Например, Тбилиси" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Улица</label>
                <input type="text" name="street" id="street" value={formData.street} onChange={handleInputChange} placeholder="Проспект Чавчавадзе" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">Номер дома</label>
                <input type="text" name="houseNumber" id="houseNumber" value={formData.houseNumber} onChange={handleInputChange} placeholder="37" className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800">Укажите на карте</h3>
           <p className="text-sm text-gray-600 mb-2">Кликните на карту, чтобы указать точное расположение. Адрес определится автоматически.</p>
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
      <div className="mt-8">
        <button onClick={onNext} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Перейти к шагу 2
        </button>
      </div>
    </div>
  )
};

// Шаг 2: Детали
const Step2 = ({ onBack, onNext, formData, setFormData }: { onBack: () => void, onNext: () => void, formData: any, setFormData: any }) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6 border-b pb-3">2. Детали объекта</h2>
            <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="areaTotal" className="block text-sm font-medium text-gray-700">Общая площадь (м²)</label>
                        <input type="number" name="areaTotal" id="areaTotal" value={formData.areaTotal || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="areaLiving" className="block text-sm font-medium text-gray-700">Жилая площадь (м²)</label>
                        <input type="number" name="areaLiving" id="areaLiving" value={formData.areaLiving || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="areaKitchen" className="block text-sm font-medium text-gray-700">Площадь кухни (м²)</label>
                        <input type="number" name="areaKitchen" id="areaKitchen" value={formData.areaKitchen || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">Количество комнат</label>
                        <input type="number" name="rooms" id="rooms" value={formData.rooms || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Этаж</label>
                        <input type="number" name="floor" id="floor" value={formData.floor || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="floorTotal" className="block text-sm font-medium text-gray-700">Этажей в доме</label>
                        <input type="number" name="floorTotal" id="floorTotal" value={formData.floorTotal || ''} onChange={handleInputChange} className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                
                 <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Состояние</label>
                    <select id="condition" name="condition" value={formData.condition || ''} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                        <option>Новый ремонт</option>
                        <option>Хорошее</option>
                        <option>Среднее</option>
                        <option>Требует ремонта</option>
                        <option>Черный каркас</option>
                        <option>Белый каркас</option>
                    </select>
                </div>

            </div>
            <div className="mt-8 flex justify-between">
                <button onClick={onBack} className="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Назад
                </button>
                <button onClick={onNext} className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                    Далее
                </button>
            </div>
        </div>
    );
}

// Шаг 3 (пока заглушка)
const Step3 = ({ onBack, formData }: { onBack: () => void, formData: any }) => (
     <div>
        <h2 className="text-xl font-semibold mb-4">3. Фотографии и описание</h2>
        <p className="mb-4">Здесь будет загрузка фото и ввод текста объявления.</p>
        <div className="bg-gray-50 p-4 rounded-md text-sm">
            <h3 className="font-semibold">Собранные данные:</h3>
            <pre className="mt-2 whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
            </pre>
        </div>
        <div className="mt-6 flex justify-between">
            <button onClick={onBack} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Назад
            </button>
            <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                Завершить
            </button>
        </div>
    </div>
)

const PostAdForm = ({ lang }: { lang: string }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Квартира',
    dealType: 'Продажа',
    city: '',
    street: '',
    houseNumber: '',
    coordinates: { lat: 41.7151, lng: 44.8271 },
    areaTotal: '',
    areaLiving: '',
    areaKitchen: '',
    rooms: '',
    floor: '',
    floorTotal: '',
    condition: 'Хорошее'
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-100">
      {step === 1 && <Step1 onNext={nextStep} formData={formData} setFormData={setFormData} lang={lang} />}
      {step === 2 && <Step2 onBack={prevStep} onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 onBack={prevStep} formData={formData} />}
    </div>
  );
};

export default PostAdForm; 