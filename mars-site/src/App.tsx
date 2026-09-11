import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter, SiteHeader } from "./components/Layout";
import { migrateLegacyData } from "./data/repository";
import { routes } from "./domain/content";
import { AideIntakePage } from "./pages/AideIntakePage";
import { AidePage, MarsPage, ProcessPage, ProductionPage, ResourcesPage } from "./pages/ContentPages";
import { FindMyPathPage } from "./pages/FindMyPathPage";
import { HomePage } from "./pages/HomePage";
import { IdeationGuidePage } from "./pages/IdeationGuidePage";
import { InventoryPage } from "./pages/InventoryPage";

function Scroll(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0);document.querySelector<HTMLElement>("main")?.focus()},[pathname]);return null}
export default function App(){useEffect(()=>{migrateLegacyData().catch(()=>undefined)},[]);return <HashRouter><Scroll/><div className="app"><SiteHeader/><main tabIndex={-1}><Routes><Route path={routes.start} element={<HomePage/>}/><Route path={routes.process} element={<ProcessPage/>}/><Route path={routes.ideation} element={<IdeationGuidePage/>}/><Route path={routes.next} element={<FindMyPathPage/>}/><Route path={routes.inventory} element={<InventoryPage/>}/><Route path={routes.mars} element={<MarsPage/>}/><Route path={routes.aide} element={<AidePage/>}/><Route path="/aide-intake" element={<AideIntakePage/>}/><Route path={routes.production} element={<ProductionPage/>}/><Route path={routes.resources} element={<ResourcesPage/>}/>{[["/find-my-path",routes.next],["/committee",routes.aide],["/production",routes.production],["/production/guide",routes.production],["/build",routes.mars],["/build/ideation-guide",routes.ideation]].map(([old,to])=><Route key={old} path={old} element={<Navigate replace to={to}/>}/>) }<Route path="*" element={<Navigate replace to="/"/>}/></Routes></main><SiteFooter/></div></HashRouter>}
