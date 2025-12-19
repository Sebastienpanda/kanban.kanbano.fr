export const DEFAULT_WORKPLACES = [
  {
    id: 1,
    name: 'Mon Projet',
    icon: 'rocket',
    columns: [
      {
        id: 1,
        title: 'À faire',
        items: [
          { id: 1, title: 'Créer la page d\'accueil' },
          { id: 2, title: 'Ajouter l\'authentification' },
          { id: 3, title: 'Configurer la base de données' },
        ],
      },
      {
        id: 2,
        title: 'En cours',
        items: [
          { id: 4, title: 'Développement de l\'API' },
          { id: 5, title: 'Intégration du frontend' },
        ],
      },
      {
        id: 3,
        title: 'Terminé',
        items: [
          { id: 6, title: 'Configuration du projet' },
          { id: 7, title: 'Installation des dépendances' },
        ],
      },
    ],
  },
];
