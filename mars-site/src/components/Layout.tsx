import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { routes } from "../domain/content";

const navigation = [[routes.start,"Start"],[routes.process,"Process"],[routes.ideation,"Ideation Guide"],[routes.next,"Find My Next Step"],[routes.inventory,"AI Solutions Inventory"],[routes.mars,"Build with MARS"],[routes.aide,"AIDE Committee"],[routes.production,"Preparing for Production"],[routes.resources,"Resources"]] as const;

export function SiteHeader() {
  const [open,setOpen] = useState(false);
  return <header className="site-header"><div className="container-page header-inner"><Link to="/" className="brand"><span className="brand-mark" aria-hidden="true">Y</span><span>AI Solutions at York<small>Office of the CIO</small></span></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="primary-nav">{open ? "Close" : "Menu"}</button><nav id="primary-nav" className={open ? "nav open" : "nav"} aria-label="Primary"><ul>{navigation.map(([to,label])=><li key={to}><NavLink to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?"active":""}>{label}</NavLink></li>)}</ul></nav></div></header>;
}
export function SiteFooter() { return <footer><div className="container-page footer-grid"><div><strong>AI Solutions at York</strong><p>From idea to responsible use.</p></div><div><strong>Prototype scope</strong><p>No information entered here is submitted to York University. No institutional inventory platform or workflow integration has been selected.</p></div><div><strong>Working governance</strong><p>AIDE provides recommendations. Change Management review is the working production gate; the accountable decision role remains to be confirmed.</p></div></div></footer>; }

export function PageHero({eyebrow,title,children}:{eyebrow:string;title:string;children:React.ReactNode}) { return <section className="hero"><div className="container-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="lede">{children}</div></div></section>; }
export function Notice() { return <p className="notice"><strong>Prototype only.</strong> Information is stored in this browser and is not submitted to York University.</p>; }
