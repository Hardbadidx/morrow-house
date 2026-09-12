import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDishById } from '../../data/menuData';

/**
 * PageMeta
 * Dynamically updates document.title based on the current route.
 */
export function PageMeta() {
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    let title = 'Morrow House — More Than Just A Meal';

    if (pathname === '/') {
      title = 'Morrow House — More Than Just A Meal';
    } else if (pathname === '/menu') {
      title = 'Morrow House — Culinary Collection & Menu';
    } else if (pathname.startsWith('/menu/')) {
      const slug = pathname.replace('/menu/', '');
      const dish = getDishById(slug);
      title = dish ? `Morrow House — ${dish.name}` : 'Morrow House — Menu Item';
    } else if (pathname === '/story') {
      title = 'Morrow House — Our Story & Philosophy';
    } else if (pathname === '/experience') {
      title = 'Morrow House — Atmospheres & Spaces';
    } else if (pathname === '/reservations') {
      title = 'Morrow House — Table Reservations';
    } else if (pathname === '/contact') {
      title = 'Morrow House — Contact & Directions';
    } else {
      title = 'Morrow House — Table Not Found';
    }

    document.title = title;
  }, [pathname, params]);

  return null;
}
