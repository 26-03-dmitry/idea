import { db, storage } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Проверяем, запущен ли сайт статически
const isStaticSite = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

// Типы данных
export interface Property {
  id?: string;
  propertyType: string;
  dealType: string;
  city: string;
  street: string;
  houseNumber: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  area: string;
  living_area?: string;
  kitchen_area?: string;
  bedrooms: string;
  floor?: string;
  total_floors?: string;
  condition: string;
  windowDirections?: string[];
  elevator?: string;
  gas?: string;
  security?: string;
  cctv?: string;
  description: string;
  maintenance_cost?: string;
  currency?: string;
  images: string[]; // URLs изображений
  video?: string; // URL видео
  price?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'sold' | 'rented';
  views: number;
  isNew: boolean;
  isFeatured: boolean;
}

// Загрузка изображений в Firebase Storage
export async function uploadImages(files: File[], propertyId: string): Promise<string[]> {
  if (!files || files.length === 0) {
    return [];
  }

  console.log(`Starting upload of ${files.length} images for property ${propertyId}`);
  
  const uploadPromises = files.map(async (file, index) => {
    try {
      // Проверяем размер файла (максимум 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error(`Изображение ${file.name} слишком большое (максимум 10MB)`);
      }

      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        throw new Error(`Файл ${file.name} не является изображением`);
      }

      console.log(`Uploading image ${index + 1}/${files.length}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      
      const timestamp = Date.now();
      const imageRef = ref(storage, `properties/${propertyId}/images/${timestamp}_${index}_${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log(`Image ${index + 1} uploaded successfully:`, downloadURL);
      return downloadURL;
    } catch (error) {
      console.error(`Error uploading image ${index + 1} (${file.name}):`, error);
      throw error;
    }
  });
  
  return Promise.all(uploadPromises);
}

// Загрузка видео в Firebase Storage
export async function uploadVideo(file: File, propertyId: string): Promise<string> {
  try {
    // Проверяем размер файла (максимум 100MB)
    if (file.size > 100 * 1024 * 1024) {
      throw new Error(`Видео ${file.name} слишком большое (максимум 100MB)`);
    }

    // Проверяем тип файла
    if (!file.type.startsWith('video/')) {
      throw new Error(`Файл ${file.name} не является видео`);
    }

    console.log(`Uploading video: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    
    const timestamp = Date.now();
    const videoRef = ref(storage, `properties/${propertyId}/video/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(videoRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('Video uploaded successfully:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}

// Функция для очистки данных от undefined значений
function cleanFormData(data: any): any {
  const cleaned: any = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Рекурсивно очищаем вложенные объекты
        const cleanedNested = cleanFormData(value);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested;
        }
      } else {
        cleaned[key] = value;
      }
    }
  }
  
  return cleaned;
}

// Создание нового объявления
export async function createProperty(formData: any): Promise<string> {
  try {
    console.log('=== НАЧАЛО СОЗДАНИЯ ОБЪЯВЛЕНИЯ В FIREBASE ===');
    console.log('Starting property creation with data:', formData);
    console.log('FormData keys:', Object.keys(formData));
    console.log('FormData coordinates:', formData.coordinates);
    
    // Временно отключаем Firebase и показываем демо-версию
    console.log('Демо-режим: имитируем создание объявления...');
    // Имитируем задержку
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Возвращаем фиктивный ID
    const fakeId = 'demo_' + Date.now();
    console.log('Демо-объявление создано с ID:', fakeId);
    return fakeId;
    
    // Если это статический сайт, показываем заглушку
    if (isStaticSite) {
      console.log('Static site detected, simulating property creation...');
      // Имитируем задержку
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Возвращаем фиктивный ID
      const fakeId = 'demo_' + Date.now();
      console.log('Demo property created with ID:', fakeId);
      return fakeId;
    }
    
    // Проверяем подключение к Firebase
    console.log('Проверяем подключение к Firebase...');
    if (!db) {
      throw new Error('Firebase Firestore не инициализирован');
    }
    if (!storage) {
      throw new Error('Firebase Storage не инициализирован');
    }
    console.log('Firebase подключен успешно');
    
    // Проверяем обязательные поля
    console.log('Проверяем обязательные поля...');
    if (!formData.propertyType || !formData.city) {
      throw new Error('Не заполнены обязательные поля: propertyType или city');
    }
    
    // Устанавливаем координаты по умолчанию если их нет
    const coordinates = formData.coordinates || { lat: 41.7151, lng: 44.8271 };
    console.log('Using coordinates:', coordinates);
    console.log('Обязательные поля проверены');

    // Создаем документ с базовыми данными
    console.log('Создаем объект данных для Firestore...');
    const propertyData: Omit<Property, 'id'> = {
      propertyType: formData.propertyType || '',
      dealType: formData.dealType || '',
      city: formData.city || '',
      street: formData.street || '',
      houseNumber: formData.houseNumber || '',
      coordinates: coordinates,
      area: formData.area || '',
      living_area: formData.living_area || '',
      kitchen_area: formData.kitchen_area || '',
      bedrooms: formData.bedrooms || '',
      floor: formData.floor || '',
      total_floors: formData.total_floors || '',
      condition: formData.condition || 'Хорошее',
      windowDirections: formData.windowDirections || [],
      elevator: formData.elevator || 'no',
      gas: formData.gas || 'no',
      security: formData.security || 'no',
      cctv: formData.cctv || 'no',
      description: formData.description || '',
      maintenance_cost: formData.maintenance_cost || '',
      currency: formData.currency || 'gel',
      images: [], // Пока пустой массив
      video: '',
      price: formData.price || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
      views: 0,
      isNew: true,
      isFeatured: false
    };

    // Очищаем данные от undefined значений
    const cleanedData = cleanFormData(propertyData);
    console.log('Cleaned data for Firestore:', cleanedData);
    console.log('Cleaned data size:', JSON.stringify(cleanedData).length, 'characters');

    console.log('Creating document in Firestore...');
    // Добавляем в Firestore
    const docRef = await addDoc(collection(db, 'properties'), cleanedData);
    const propertyId = docRef.id;
    console.log('Document created with ID:', propertyId);

    // Загружаем изображения если есть
    let imageUrls: string[] = [];
    if (formData.images && formData.images.length > 0) {
      console.log(`Uploading ${formData.images.length} images...`);
      try {
        imageUrls = await uploadImages(formData.images, propertyId);
        console.log('Images uploaded successfully:', imageUrls);
      } catch (imageError) {
        console.error('Error uploading images:', imageError);
        throw new Error(`Ошибка загрузки изображений: ${imageError}`);
      }
    }

    // Загружаем видео если есть
    let videoUrl = '';
    if (formData.video) {
      console.log('Uploading video...');
      try {
        videoUrl = await uploadVideo(formData.video, propertyId);
        console.log('Video uploaded successfully:', videoUrl);
      } catch (videoError) {
        console.error('Error uploading video:', videoError);
        throw new Error(`Ошибка загрузки видео: ${videoError}`);
      }
    }

    // Обновляем документ с URL изображений и видео
    console.log('Updating document with media URLs...');
    const updateData = cleanFormData({
      images: imageUrls,
      video: videoUrl,
      updatedAt: new Date()
    });
    
    await updateDoc(doc(db, 'properties', propertyId), updateData);

    console.log('Property created successfully:', propertyId);
    console.log('=== ОБЪЯВЛЕНИЕ УСПЕШНО СОЗДАНО В FIREBASE ===');
    return propertyId;
  } catch (error) {
    console.error('=== ОШИБКА ПРИ СОЗДАНИИ ОБЪЯВЛЕНИЯ В FIREBASE ===');
    console.error('Ошибка при создании объявления:', error);
    console.error('Error details:', {
      name: (error as any)?.name,
      message: (error as any)?.message,
      code: (error as any)?.code,
      stack: (error as any)?.stack
    });
    throw error;
  }
}

// Получение всех объявлений
export async function getProperties(limitCount: number = 20): Promise<Property[]> {
  try {
    // Если это статический сайт, возвращаем пустой массив
    if (isStaticSite) {
      console.log('Static site detected, returning empty properties array');
      return [];
    }
    
    const q = query(
      collection(db, 'properties'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const properties: Property[] = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data()
      } as Property);
    });
    
    return properties;
  } catch (error) {
    console.error('Ошибка при получении объявлений:', error);
    return [];
  }
}

// Получение объявления по ID
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Если это статический сайт, возвращаем null
    if (isStaticSite) {
      console.log('Static site detected, returning null for property by ID');
      return null;
    }
    
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDocs(query(collection(db, 'properties'), where('__name__', '==', id)));
    
    if (!docSnap.empty) {
      const doc = docSnap.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Property;
    }
    
    return null;
  } catch (error) {
    console.error('Ошибка при получении объявления:', error);
    return null;
  }
}

// Обновление счетчика просмотров
export async function incrementViews(propertyId: string): Promise<void> {
  try {
    // Если это статический сайт, ничего не делаем
    if (isStaticSite) {
      console.log('Static site detected, skipping views increment');
      return;
    }
    
    const propertyRef = doc(db, 'properties', propertyId);
    const property = await getPropertyById(propertyId);
    
    if (property) {
      await updateDoc(propertyRef, {
        views: property.views + 1,
        updatedAt: new Date()
      });
    }
  } catch (error) {
    console.error('Ошибка при обновлении просмотров:', error);
  }
} 