/**
 * AppSidebar - Beautiful feminine navigation sidebar
 */

import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Heart,
  BarChart3,
  BookOpen,
  Info,
  Globe,
  Flower2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useI18n, languageNames, type Language } from "@/lib/i18n";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });
  const { t, lang, setLang } = useI18n();

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    { title: t.navHome, url: "/", icon: Home },
    { title: t.navTips, url: "/tips", icon: Heart },
    { title: t.navAnalytics, url: "/analytics", icon: BarChart3 },
    { title: t.navNotes, url: "/notes", icon: BookOpen },
    { title: t.navAbout, url: "/about", icon: Info },
  ];

  const languages: Language[] = ["en", "sq", "es", "fr", "de", "tr"];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="px-4 py-5 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Flower2 className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold text-foreground">{t.appTitle}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{t.appSubtitle}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      to={item.url}
                      className="flex items-center gap-2.5 hover:bg-muted/50"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
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
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              {t.language}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-1 flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-all font-medium ${
                      lang === l
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {languageNames[l]}
                  </button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="px-4 py-3 text-[10px] text-muted-foreground text-center">
            <span className="opacity-60">© 2026 DS Interactive</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
