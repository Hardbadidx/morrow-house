import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDish, setSelectedDish] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reservationPrefill, setReservationPrefill] = useState(null);

  // Derived current view from location pathname
  const currentView = location.pathname === '/'
    ? 'home'
    : location.pathname.replace('/', '').split('/')[0];

  const navigateTo = (view, sectionId = null) => {
    setIsMobileMenuOpen(false);
    const targetRoute = view === 'home' ? '/' : `/${view}`;
    navigate(targetRoute);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const openDishModal = (dish) => {
    if (dish && dish.id) {
      navigate(`/menu/${dish.id}`);
    } else {
      setSelectedDish(dish);
    }
  };

  const closeDishModal = () => {
    setSelectedDish(null);
  };

  const startReservation = (zoneOrDish = null) => {
    setIsMobileMenuOpen(false);
    if (zoneOrDish) {
      setReservationPrefill(zoneOrDish);
      navigate(`/reservations?experience=${encodeURIComponent(zoneOrDish)}`);
    } else {
      navigate('/reservations');
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedDish,
        openDishModal,
        closeDishModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        reservationPrefill,
        startReservation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
