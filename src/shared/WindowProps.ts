export interface WindowProps {
  appName: string;
  isOpen: boolean;
  isHidden: boolean;
  handleClose: () => void;
  handleHide: () => void;
  zIndex: number;
}
