export interface RegisteredProject {
  id: string;
  projectName: string;
  clientName: string;
  templateSlug: string;
  templateTitle: string;
  version: string;
  domain: string;
  licenseKey: string;
  status: "active" | "transferred" | "archived";
  registeredAt: string;
  termsVersion: string;
}

export interface UserSubscription {
  planId: "individual" | "pro" | "studio";
  planName: string;
  status: "active" | "cancelled" | "past_due";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  projectsUsed: number;
  projectsLimit: number;
  seats: number;
}

export const INITIAL_USER_SUBSCRIPTION: UserSubscription = {
  planId: "pro",
  planName: "Pro Pass",
  status: "active",
  currentPeriodEnd: "2027-10-18T00:00:00Z",
  cancelAtPeriodEnd: false,
  projectsUsed: 2,
  projectsLimit: 5,
  seats: 1,
};

export const INITIAL_PROJECTS: RegisteredProject[] = [
  {
    id: "proj_01",
    projectName: "Foster & Grey Minimal Showcase",
    clientName: "Foster & Grey Architects",
    templateSlug: "studio-arch",
    templateTitle: "Studio",
    version: "v2.1.0",
    domain: "fostergrey-arch.com",
    licenseKey: "VLV-8921-X992-EPL",
    status: "active",
    registeredAt: "2026-10-20T14:32:00Z",
    termsVersion: "2026-v2.1",
  },
  {
    id: "proj_02",
    projectName: "Kanso Interiors Flagship",
    clientName: "Kanso Design Studio",
    templateSlug: "nexora-spatial",
    templateTitle: "Nexora",
    version: "v1.8.4",
    domain: "kanso-spatial.design",
    licenseKey: "VLV-3342-M401-EPL",
    status: "active",
    registeredAt: "2026-11-02T09:15:00Z",
    termsVersion: "2026-v2.1",
  },
];
