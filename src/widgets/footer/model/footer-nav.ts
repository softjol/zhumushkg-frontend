
export const footerNavItems = [
    {
      id: 'seeker',
      title: 'Соискателям',
      links: [
        { to: '/', label: 'Найти работу' },
        { to: '/resume', label: 'Создать резюме' },
        { to: '/applications', label: 'Мои отклики', protected: true },
        { to: '/favorites', label: 'Избранное', protected: true },
      ],
    },
    {
      id: 'employer',
      title: 'Работодателям',
      links: [
        { to: '/employer/create-vacancy', label: 'Разместить вакансию' },
        { to: '/employer/pricing', label: 'Тарифы' },
        { to: '/employer/vacancies', label: 'Кабинет работодателя', protected: true },
      ],
    },
    {
      id: 'company',
      title: 'Компания',
      links: [
        { to: '/about', label: 'О нас' },
        { to: '/contacts', label: 'Контакты' },
        { to: '/help', label: 'Помощь / FAQ' },
        { to: 'mailto:support@jomush.kg', label: 'Написать в поддержку' },
      ],
    },
  ]