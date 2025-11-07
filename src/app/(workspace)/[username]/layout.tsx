import { SidebarInset } from "@/components/ui/sidebar"
import AppHeader from "@/components/workspace/app-header"
import { AppSidebar } from "@/components/workspace/app-sidebar"
import { SidebarWrapper } from "@/components/workspace/sidebar-wrapper"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarWrapper>
            <AppSidebar />
            <SidebarInset>
                <AppHeader />
                <div className="p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarWrapper>
    )
}

export default DashboardLayout