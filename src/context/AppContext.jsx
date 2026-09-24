import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_AGENTS, INITIAL_INQUIRIES, INITIAL_USERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('eh_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('eh_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('eh_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('eh_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('eh_favorites');
    return saved ? JSON.parse(saved) : ['luxury-3-bhk-apartment-jaipur', 'modern-villa-with-garden-gurgaon'];
  });

  // Property comparison list
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('eh_compare');
    return saved ? JSON.parse(saved) : ['luxury-3-bhk-apartment-jaipur', 'modern-villa-with-garden-gurgaon'];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('eh_user');
    return saved ? JSON.parse(saved) : {
      id: "usr-1",
      name: "Rahul Sharma",
      email: "rahul.sharma@estatehub.com",
      role: "Agent",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    };
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    localStorage.setItem('eh_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('eh_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('eh_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('eh_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eh_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eh_user');
    }
  }, [currentUser]);

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      let updated;
      if (exists) {
        updated = prev.filter(item => item !== id);
        triggerToast('Removed from favorites', 'info');
      } else {
        updated = [...prev, id];
        triggerToast('Property saved to your favorites!', 'success');
      }
      return updated;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        triggerToast('Removed property from comparison', 'info');
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        triggerToast('You can compare a maximum of 4 properties at once.', 'error');
        return prev;
      }
      triggerToast('Added property to comparison list!', 'success');
      return [...prev, id];
    });
  };

  const isComparing = (id) => compareList.includes(id);

  const addProperty = (newProp) => {
    const createdProp = {
      ...newProp,
      id: newProp.slug || `prop-${Date.now()}`,
      propertyId: `EH-${(newProp.city || 'IND').substring(0,3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      views: 0,
      inquiriesCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      verified: newProp.verified ?? false,
      featured: newProp.featured ?? false,
      status: newProp.status || 'Published',
      agent: {
        id: currentUser?.id || 'agent-1',
        name: currentUser?.name || 'Rahul Sharma',
        role: currentUser?.role || 'Real Estate Consultant',
        experience: '5+ Years',
        rating: 4.8,
        reviewCount: 12,
        phone: '+91 6375521991',
        whatsapp: '+916375521991',
        email: currentUser?.email || 'hello@aianthro.com',
        image: currentUser?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        location: `${newProp.city}, ${newProp.state}`
      }
    };

    setProperties(prev => [createdProp, ...prev]);
    triggerToast('Property listed successfully!', 'success');
    return createdProp;
  };

  const updateProperty = (id, updatedFields) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    triggerToast('Property updated successfully', 'success');
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    triggerToast('Property removed successfully', 'info');
  };

  const updatePropertyStatus = (id, status) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    triggerToast(`Property status updated to "${status}"`, 'success');
  };

  const addInquiry = (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      ...inquiryData
    };
    setInquiries(prev => [newInq, ...prev]);
    triggerToast('Thank you! Your inquiry has been submitted successfully.', 'success');
  };

  const addSiteVisit = (visitData) => {
    const newInq = {
      id: `visit-${Date.now()}`,
      date: visitData.visitDate,
      status: 'New',
      name: visitData.name,
      email: visitData.email,
      phone: visitData.phone,
      propertyId: visitData.propertyId,
      propertyTitle: visitData.propertyTitle,
      agentId: visitData.agentId || 'agent-1',
      agentName: visitData.agentName || 'Rahul Sharma',
      message: `[SCHEDULED SITE VISIT] Preferred Slot: ${visitData.timeSlot} (${visitData.visitType}). Notes: ${visitData.notes || 'N/A'}`
    };
    setInquiries(prev => [newInq, ...prev]);
    triggerToast(`Site visit scheduled for ${visitData.visitDate} (${visitData.timeSlot})! Our representative will confirm via SMS.`, 'success');
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    triggerToast(`Inquiry status set to ${status}`, 'info');
  };

  const login = (email, role = 'Agent', name = 'Rahul Sharma') => {
    const userObj = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      role: role,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    };
    setCurrentUser(userObj);
    triggerToast(`Welcome back, ${userObj.name}! Logged in as ${role}`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    triggerToast('Logged out successfully', 'info');
  };

  const switchRole = (newRole) => {
    if (currentUser) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
      triggerToast(`Switched active view to ${newRole}`, 'info');
    } else {
      login('demo@estatehub.com', newRole, `Demo ${newRole}`);
    }
  };

  return (
    <AppContext.Provider value={{
      properties,
      agents,
      inquiries,
      users,
      favorites,
      compareList,
      currentUser,
      toast,
      toggleFavorite,
      isFavorite,
      toggleCompare,
      isComparing,
      addProperty,
      updateProperty,
      deleteProperty,
      updatePropertyStatus,
      addInquiry,
      addSiteVisit,
      updateInquiryStatus,
      login,
      logout,
      switchRole,
      triggerToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
