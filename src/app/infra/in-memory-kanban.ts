import { Injectable } from "@angular/core";
import type { ColumnsGateway } from "@domain/gateways/columns.gateway";
import type { Column } from "@domain/models/kanban-column.model";
import { BehaviorSubject, defer, type Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class InMemoryKanban implements ColumnsGateway {
    private readonly _columns = new BehaviorSubject<Column[]>([
        {
            id: crypto.randomUUID(),
            title: "Backlog",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter l'authentification OAuth2",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter la recherche avancée",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le système de notifications push",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Améliorer les performances de la base de données",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter le support multi-langue",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer un système de gestion des permissions",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le SSO avec Azure AD",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter l'export PDF des rapports",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer un système de logs centralisé",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter la recherche full-text avec Elasticsearch",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter le support des webhooks",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer une API GraphQL",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le rate limiting",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la compression des images",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "À faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Créer le composant de profil utilisateur",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le drag & drop pour les fichiers",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la validation des formulaires",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le système de commentaires",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter les filtres avancés",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la pagination côté serveur",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le module de messagerie interne",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter l'upload multiple de fichiers",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter les notifications en temps réel",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le système de favoris",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "En cours",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Intégrer l'API de paiement Stripe",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Développer le tableau de bord analytique",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le système de gestion des rôles",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le lazy loading des images",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la synchronisation offline",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer les graphiques de statistiques",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le système de tags",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter l'historique des modifications",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "En revue",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Refactoriser le service d'authentification",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Optimiser les images pour le web",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter les tests unitaires pour le panier",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le système de cache applicatif",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer la documentation API Swagger",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la gestion des erreurs globale",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Optimiser les requêtes SQL N+1",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le système de templates d'email",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter la validation côté serveur",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer les migrations de base de données",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "En test",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Corriger le bug du panier vide",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Améliorer l'accessibilité WCAG AA",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Tester le système de paiement en sandbox",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Vérifier la compatibilité mobile",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Tester les performances sous charge",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Valider le flux d'inscription",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Tester l'envoi d'emails",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Vérifier la sécurité XSS/CSRF",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Tester le responsive design sur tablettes",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "Terminé",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Configurer le pipeline CI/CD",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Mettre en place le système de cache Redis",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer la page d'accueil responsive",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le mode sombre",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Configurer le monitoring avec Sentry",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Mettre en place les sauvegardes automatiques",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer le système de connexion/inscription",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter la réinitialisation de mot de passe",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Ajouter Google Analytics",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Configurer le CDN Cloudflare",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Créer les seeds de base de données",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Implémenter le système de sessions",
                },
            ],
        },
    ]);

    getAll(): Observable<Column[]> {
        return defer(() => this._columns.asObservable());
    }
}
