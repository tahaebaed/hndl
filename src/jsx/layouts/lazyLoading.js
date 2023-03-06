import { lazy } from 'react';

export const VehiclesList = lazy(() => import('../pages/Vehicles/VehiclesList'));
export const VehiclesAssignment = lazy(() => import('../pages/Vehicles/VehiclesAssignment'));

export const InspectionList = lazy(() => import('../pages/Inspection/InspectionList'));
export const InspectionForm = lazy(() => import('../pages/Inspection/InspectionForm'));

export const Issues = lazy(() => import('../pages/Issues/Issues'));

export const ServiceList = lazy(() => import('../pages/Service/ServiceList'));
export const ServiceHistory = lazy(() => import('../pages/Service/ServiceHistory'));
export const ServiceProgram = lazy(() => import('../pages/Service/ServiceProgram'));

export const Employees = lazy(() => import('../pages/Employees/Employees'));

export const Contacts = lazy(() => import('../pages/Contacts/Contacts'));

export const Warehouse = lazy(() => import('../pages/Warehouse/Warehouse'));

export const FuelHistory = lazy(() => import('../pages/Fuel_history/FuelHistory'));

export const SmartCardsReq = lazy(() => import('../pages/Smart_Cards/CardsRequests'));
export const SmartCardsManagement = lazy(() => import('../pages/Smart_Cards/CardsManagement'));

export const Map = lazy(() => import('../pages/Map/Map'));

export const Finances = lazy(() => import('../pages/Finances/Finances'));
export const FinanceHistory = lazy(() => import('../pages/Finances/FinancesHistory'));
