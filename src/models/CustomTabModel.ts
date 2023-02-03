export interface CustomTabModel {
    selectedTab: string;
    onTabSelect: (selectedTab: string) => void;
    tabs: { tabId: string, i8nCode: string }[];
    customCssClass?: string
}
