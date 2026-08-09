import {
  ArrowRightLeft,
  BadgeCheck,
  Blocks,
  Building2,
  ClipboardCheck,
  Eye,
  FileText,
  Globe,
  Home,
  Key,
  MapPin,
  Megaphone,
  MessagesSquare,
  Scale,
  TrendingUp,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Resolves an icon name string to a lucide component.
 *
 * `site-config.ts` stores icon names as strings so it stays a plain,
 * serialisable data module with no React dependency. This is the single
 * place that maps those names to components.
 *
 * Stroke width and rounded caps match the brand sheet's icon spec:
 * "Outline | 2px Stroke | Rounded Corners".
 */
const ICONS: Record<string, LucideIcon> = {
  ArrowRightLeft,
  BadgeCheck,
  Blocks,
  Building2,
  ClipboardCheck,
  Eye,
  FileText,
  Globe,
  Home,
  Key,
  MapPin,
  Megaphone,
  MessagesSquare,
  Scale,
  TrendingUp,
  UserRoundCheck,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Home;
  return (
    <Icon
      className={cn("size-5", className)}
      strokeWidth={2}
      aria-hidden
    />
  );
}
