'use client'

import React, { useState } from 'react';

const PostAdForm = ({ dict }: { dict: any }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="bg-white p-8 rounded-sm border">
      <h2 className="text-2xl font-medium mb-6">Шаг {step} из 5</h2>
      
      {step === 1 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Основная информация</h3>
          <p>Поля для типа недвижимости, расположения и т.д.</p>
        </div>
      )}

      {step === 2 && (
        <div>
           <h3 className="text-lg font-medium mb-4">Детали и фото</h3>
           <p>Поля для площади, комнат, загрузки фотографий.</p>
        </div>
      )}

      {/* ... другие шаги ... */}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button onClick={prevStep} className="px-6 py-2 border rounded-sm text-gray-700 hover:bg-gray-50">
            Назад
          </button>
        )}
        {step < 5 ? (
          <button onClick={nextStep} className="px-6 py-2 bg-primary-600 text-white rounded-sm hover:bg-primary-700">
            Далее
          </button>
        ) : (
          <button className="px-6 py-2 bg-accent-500 text-white rounded-sm hover:bg-accent-600">
            Разместить объявление
          </button>
        )}
      </div>
    </div>
  );
};

export default PostAdForm; 