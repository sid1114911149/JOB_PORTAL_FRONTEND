import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "toast",
          description: "toast-description",
          actionButton: "toast-action-button",
          cancelButton: "toast-cancel-button",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };