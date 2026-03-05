import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setAccessToken } from '../api/client.js';

const AppContext = createContext(undefined);

/** Normalize backend card to frontend shape { id, type, name, data, createdAt, status, downloads } */
function toFrontendCard(backendCard, cardType) {
  if (!backendCard) return null;
  const id = backendCard._id?.toString() || backendCard.id;
  const name = backendCard.name || backendCard.brandName || 'Untitled';
  const data = { ...backendCard };
  delete data._id;
  delete data.id;
  delete data.userId;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.viewCount;
  delete data.downloadCount;
  return {
    id,
    type: cardType,
    name,
    data,
    createdAt: backendCard.createdAt || new Date().toISOString(),
    status: 'active',
    downloads: backendCard.downloadCount ?? 0,
  };
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('profilex_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {
        localStorage.removeItem('profilex_user');
      }
    }
  }, []);

  const fetchCards = useCallback(async () => {
    setCardsLoading(true);
    try {
      const [vRes, bRes, brRes] = await Promise.allSettled([
        api.vehicleCard.my(),
        api.businessCard.my(),
        api.brandCard.my(),
      ]);
      const list = [];
      const toList = (payload, type) => {
        const arr = Array.isArray(payload) ? payload : payload ? [payload] : [];
        arr.forEach((c) => {
          const card = toFrontendCard(c, type);
          if (card) list.push(card);
        });
      };
      if (vRes.status === 'fulfilled' && vRes.value?.data != null) toList(vRes.value.data, 'vehicle');
      if (bRes.status === 'fulfilled' && bRes.value?.data != null) toList(bRes.value.data, 'business');
      if (brRes.status === 'fulfilled' && brRes.value?.data != null) toList(brRes.value.data, 'brand');
      setCards(list);
    } catch (err) {
      if (err?.status === 401) setUser(null);
      setCards([]);
    } finally {
      setCardsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchCards();
    else setCards([]);
  }, [user, fetchCards]);

  useEffect(() => {
    if (user) localStorage.setItem('profilex_user', JSON.stringify(user));
    else localStorage.removeItem('profilex_user');
  }, [user]);

  const login = async (email, password) => {
    const res = await api.auth.login({ email, password });
    const u = res?.data?.user || res?.user;
    const token = res?.data?.accessToken || res?.accessToken;
    if (!u) throw new Error('Invalid response');
    if (token) setAccessToken(token);
    const profile = {
      id: u._id || u.id,
      name: u.fullName || u.name,
      email: u.email,
      username: u.username,
    };
    setUser(profile);
  };

  const signup = async (name, email, password) => {
    await api.auth.register({ name, email, password });
    // Log in to get access token (cookies don't work cross-origin; we use Bearer token)
    const res = await api.auth.login({ email, password });
    const u = res?.data?.user || res?.user;
    const token = res?.data?.accessToken || res?.accessToken;
    if (!u) throw new Error('Invalid response');
    if (token) setAccessToken(token);
    const profile = {
      id: u._id || u.id,
      name: u.fullName || u.name,
      email: u.email,
      username: u.username,
    };
    setUser(profile);
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (_) {}
    setAccessToken(null);
    setUser(null);
    setCards([]);
    localStorage.removeItem('profilex_user');
  };

  const createCard = async (type, formData) => {
    if (type === 'vehicle') {
      // Backend requires vehicleNumber (numeric) and registrationNumber (non-empty string)
      const vehicleNumRaw = String(formData.vehicleNumber ?? '').trim();
      const vehicleNumber = vehicleNumRaw ? parseInt(vehicleNumRaw.replace(/\D/g, ''), 10) || 0 : 0;
      const phoneDigits = String(formData.phone ?? '').replace(/\D/g, '');
      const mobileNumber = phoneDigits ? parseInt(phoneDigits, 10) : 0;
      const body = {
        name: (formData.ownerName || formData.name || '').trim() || 'Owner',
        designation: (formData.designation || 'Owner').trim(),
        vehicleNumber,
        vehicleType: (formData.vehicleModel || formData.vehicleType || 'Other').trim(),
        registrationNumber: (formData.registrationNumber || formData.vehicleNumber || vehicleNumRaw || 'N/A').trim(),
        mobileNumber,
        address: (formData.address || formData.insurance || '').trim() || undefined,
      };
      const res = await api.vehicleCard.create(body);
      const created = res?.data?.vehicleCard;
      if (created) {
        const card = toFrontendCard(created, 'vehicle');
        setCards((prev) => [card, ...prev]);
        return card;
      }
    }
    if (type === 'business') {
      const body = {
        name: formData.name || '',
        designation: formData.role || '',
        company: formData.company || '',
        email: formData.email || '',
        mobileNumber: formData.phone || '',
        website: formData.website || '',
        address: formData.address || formData.linkedin || '',
      };
      const res = await api.businessCard.create(body);
      const created = res?.data?.businessCard;
      if (created) {
        const card = toFrontendCard(created, 'business');
        setCards((prev) => [card, ...prev]);
        return card;
      }
    }
    if (type === 'brand') {
      const body = {
        brandName: formData.brandName || '',
        tagline: formData.tagline || '',
        website: formData.website || '',
        logoUrl: formData.logoUrl || '',
        description: formData.description || '',
      };
      const res = await api.brandCard.create(body);
      const created = res?.data?.brandCard;
      if (created) {
        const card = toFrontendCard(created, 'brand');
        setCards((prev) => [card, ...prev]);
        return card;
      }
    }
    // Fallback for personal/event/custom: local only
    const newCard = {
      id: Date.now().toString(),
      type,
      name: formData.name || formData.brandName || formData.vehicleNumber || 'Untitled Card',
      createdAt: new Date().toISOString(),
      status: 'active',
      downloads: 0,
      data: formData,
    };
    setCards((prev) => [newCard, ...prev]);
    return newCard;
  };

  const updateCard = (id, data) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, data: { ...card.data, ...data } } : card))
    );
  };

  const deleteCard = async (id) => {
    const card = cards.find((c) => c.id === id);
    if (card?.type === 'vehicle') await api.vehicleCard.delete(id);
    else if (card?.type === 'business') await api.businessCard.delete(id);
    else if (card?.type === 'brand') await api.brandCard.delete(id);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const incrementDownload = (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, downloads: (c.downloads || 0) + 1 } : c))
    );
  };

  const getLatestCard = () => (cards.length > 0 ? cards[0] : null);

  return (
    <AppContext.Provider
      value={{
        user,
        cards,
        cardsLoading,
        fetchCards,
        login,
        signup,
        logout,
        createCard,
        updateCard,
        deleteCard,
        incrementDownload,
        getLatestCard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
