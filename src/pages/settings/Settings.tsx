import MainLayout from "../../components/layout/MainLayout";
import SettingsHeader from "../../components/SettingsHeader";
import SettingsSection from "../../components/SettingsSection";
import ThemeSelector from "../../components/ThemeSelector";
import useSettings from "../../hooks/useSettings";
import { FaPalette } from "react-icons/fa";

const Settings = () => {
  const { handleThemeChange, isDarkMode, isThemeOpen, setIsThemeOpen } =
    useSettings();

  return (
    <MainLayout title="Settings">
      <SettingsHeader isDarkMode={isDarkMode} />

      {/* Theme Settings */}
      <SettingsSection
        title="Theme Settings"
        icon={<FaPalette />}
        isOpen={isThemeOpen}
        toggleOpen={() => setIsThemeOpen((prev) => !prev)}
        isDarkMode={isDarkMode}
      >
        <ThemeSelector isDarkMode={isDarkMode} onChange={handleThemeChange} />
      </SettingsSection>
    </MainLayout>
  );
};

export default Settings;
