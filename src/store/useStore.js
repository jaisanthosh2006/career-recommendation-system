import { create } from 'zustand';

const defaultUser = {
  id: 'user_101',
  name: 'Sandy',
  email: 'sandy@example.com',
  role: 'student',
  profileCompletion: 85,
  careerScore: 88,
  atsScore: 86,
  placementReadiness: 82,
  streakDays: 14,
  xpPoints: 3450,
  careerCoins: 420,
  skills: ['React', 'Python', 'Git', 'DSA', 'SQL', 'Anatomy', 'First Aid'],
  completedCourses: ['cs-python', 'cs-git', 'med-termino', 'med-firstaid'],
  enrolledClasses: ['class-001', 'class-002']
};

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('authUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        // Always use 'Sandy' as the user name
        const user = { ...defaultUser, ...parsed, name: 'Sandy', email: 'sandy@example.com' };
        localStorage.setItem('authUser', JSON.stringify(user));
        return user;
      }
    }
  } catch (e) {
    console.error('Failed to parse authUser:', e);
  }
  return defaultUser;
};

export const useStore = create((set, get) => ({
  // Active Domain: 'cs' (Computer Science & IT) or 'medical' (Medical & Healthcare)
  activeDomain: localStorage.getItem('activeDomain') || 'cs',
  setDomain: (domain) => {
    localStorage.setItem('activeDomain', domain);
    set({ activeDomain: domain });
  },

  // User details
  user: getInitialUser(),

  updateProfile: (updatedFields) => {
    const newStats = { ...get().user, ...updatedFields };
    localStorage.setItem('authUser', JSON.stringify(newStats));
    set({ user: newStats });
  },

  // Gamification
  addXP: (points) => {
    const currentUser = get().user;
    const newXP = (currentUser.xpPoints || 3450) + points;
    const newCoins = (currentUser.careerCoins || 420) + Math.floor(points / 2);
    get().updateProfile({ xpPoints: newXP, careerCoins: newCoins });
  },

  // Class Registrations
  registeredClasses: JSON.parse(localStorage.getItem('registeredClasses') || '["class-001"]'),
  registerForClass: (classId) => {
    const current = get().registeredClasses || [];
    if (!current.includes(classId)) {
      const updated = [...current, classId];
      localStorage.setItem('registeredClasses', JSON.stringify(updated));
      set({ registeredClasses: updated });
    }
  },

  // Saved / Bookmarked Materials
  savedMaterials: JSON.parse(localStorage.getItem('savedMaterials') || '[]'),
  toggleSaveMaterial: (materialId) => {
    const current = get().savedMaterials || [];
    const updated = current.includes(materialId)
      ? current.filter(id => id !== materialId)
      : [...current, materialId];
    localStorage.setItem('savedMaterials', JSON.stringify(updated));
    set({ savedMaterials: updated });
  },

  // Global Notifications
  notifications: [
    { id: 1, title: 'Live Class Alert', text: 'Mastering AI Resume starts in 30 minutes!', time: '10m ago', unread: true },
    { id: 2, title: 'New Internship Matches', text: 'Google and Apollo Hospitals added new roles matching your profile.', time: '1h ago', unread: true },
    { id: 3, title: 'Badge Unlocked!', text: 'You earned the "Prompt Engineering Specialist" badge!', time: '1d ago', unread: false }
  ],
  markAllNotificationsRead: () => {
    set({
      notifications: (get().notifications || []).map(n => ({ ...n, unread: false }))
    });
  }
}));
