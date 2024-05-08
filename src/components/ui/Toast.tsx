import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,Slide} from 'react-toastify';

export default function ToastComponent() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={1800}
      closeOnClick
      theme='light'
      transition={Slide}
      draggable={true}
      stacked={true}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
  )
}
