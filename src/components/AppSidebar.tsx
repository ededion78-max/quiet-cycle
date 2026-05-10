/**
 * AppSidebar - Premium feminine navigation sidebar with language picker
 */

import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Heart, BarChart3, BookOpen, Info, Globe, Settings, Droplets, HelpCircle,
  Bell, Thermometer, Bot, Users, LogIn,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useI18n, languageNames } from "@/lib/i18n";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useState } from "react";
import appIcon from "@/assets/app-icon.png";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const { t, lang } = useI18n();
  const [showLangPicker, setShowLangPicker] = useState(false);

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { title: t.navHome, url: "/", icon: Home },
    { title: t.navTips, url: "/tips", icon: Heart },
    { title: t.navAnalytics, url: "/analytics", icon: BarChart3 },
    { title: t.navReminders, url: "/reminders", icon: Bell },
    { title: t.navBbt, url: "/bbt", icon: Thermometer },
    { title: t.navChat, url: "/chat", icon: Bot },
    { title: t.navPartner, url: "/partner", icon: Users },
    { title: t.navNotes, url: "/notes", icon: BookOpen },
    { title: t.navHydration, url: "/hydration", icon: Droplets },
    { title: t.navAuth, url: "/auth", icon: LogIn },
    { title: t.navFaq, url: "/faq", icon: HelpCircle },
    { title: t.navSettings, url: "/settings", icon: Settings },
    { title: t.navAbout, url: "/about", icon: Info },
  ];

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          {/* Brand */}
          <div className="px-4 py-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shrink-0 shadow-md">
              <img src={appIcon} alt="My Cycle" width={40} height={40} className="w-full h-full object-cover" />
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
              {t.menu}
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

          {/* Language Button */}
          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupContent>
                <button
                  onClick={() => setShowLangPicker(true)}
                  className="w-full mx-3 px-4 py-3 rounded-2xl bg-muted/60 hover:bg-muted transition-colors flex items-center gap-3"
                >
                  <Globe className="w-4 h-4 text-primary" />
                  <div className="text-left flex-1">
                    <p className="text-xs font-semibold text-foreground">{t.language}</p>
                    <p className="text-[10px] text-muted-foreground">{languageNames[lang]}</p>
                  </div>
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

      <LanguagePicker open={showLangPicker} onClose={() => setShowLangPicker(false)} />
    </>
  );
}
