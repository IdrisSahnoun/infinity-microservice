import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    {path:'/stock/list', title: 'Stocks',  icon: 'list', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  
    { path: '/admin/events', title: 'Événements (Admin)', icon: 'event', class: '' },         // ✅ Ajouté
    { path: '/admin/events/create', title: 'Créer Événement', icon: 'add_circle', class: '' }, // ✅    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/plans', title: 'Plans', icon: 'assignment', class: '' }, // Example new route
    { path: '/progression/:id', title: 'Progression', icon: 'trending_up', class: '' } ,
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/mic', title: 'Competitions',  icon: 'emoji_events', class: '' }, 
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/microservice1/salles', title: 'Sports Facilities',  icon:'fitness_center', class: '' },
    { path: 'food-list', title: 'Food list',  icon:'food', class: '' },
    { path: '/microservice1/sports', title: 'Sports',  icon:'sports', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
