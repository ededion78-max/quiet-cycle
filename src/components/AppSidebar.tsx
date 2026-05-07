/**
 * AppSidebar - Premium feminine navigation sidebar with 50+ languages
 */

import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Heart, BarChart3, BookOpen, Info, Globe, Flower2, Settings, ChevronDown,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useI18n, languageNames, languageGroups, type Language } from "@/lib/i18n";
import { useState } from "react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const { t, lang, setLang } = useI18n();
  const [showAllLangs, setShowAllLangs] = useState(false);

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { title: t.navHome, url: "/", icon: Home },
    { title: t.navTips, url: "/tips", icon: Heart },
    { title: t.navAnalytics, url: "/analytics", icon: BarChart3 },
    { title: t.navNotes, url: "/notes", icon: BookOpen },
    { title: t.navSettings, url: "/settings", icon: Settings },
    { title: t.navAbout, url: "/about", icon: Info },
  ];

  const allLanguages = showAllLangs
    ? [...languageGroups.popular, ...languageGroups.european, ...languageGroups.asian, ...languageGroups.middleEast, ...languageGroups.african]
    : languageGroups.popular;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="px-4 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-md">
            <Flower2 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold text-foreground tracking-tight">{t.appTitle}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{t.appSubtitle}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Language Selector */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
              <Globe className="w-3 h-3 inline mr-1.5" />
              {t.language} ({Object.keys(languageNames).length})
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-1.5 flex flex-wrap gap-1.5">
                {allLanguages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all font-medium leading-relaxed ${
                      lang === l
                        ? "gradient-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {languageNames[l]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAllLangs(!showAllLangs)}
                className="w-full px-3 py-1.5 text-[10px] text-primary font-medium flex items-center justify-center gap-1 hover:bg-muted/50 rounded-lg transition-colors"
              >
                {showAllLangs ? "Show less" : `+${Object.keys(languageNames).length - languageGroups.popular.length} more`}
                <ChevronDown className={`w-3 h-3 transition-transform ${showAllLangs ? "rotate-180" : ""}`} />
              </button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="px-4 py-3 text-center">
            <p className="text-[9px] text-muted-foreground/50 font-medium tracking-wide">
              © 2026 DS Interactive
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
