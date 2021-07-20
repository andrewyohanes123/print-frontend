import { Alert } from 'rsuite'
import { AxiosError } from 'axios';
import AuthProvider from '@edgarjeremy/sirius.adapter/dist/libs/AuthProvider';

interface Errors extends AxiosError {
  errors?: {
    errors?: errorMsg[];
  };
}

type errorMsg = {
  msg: string;
}

export default function ErrorCatcher(error: Errors, { auth, setLogout }: { auth: AuthProvider, setLogout: () => void }) {  
  const logout = () => {
    auth!.remove().then(resp => {
      setLogout!();
      console.log(resp);
      console.log('object')
      Alert.warning('Sesi login Anda sudah habis. Silakan login kembali');
    }).catch(e => Alert.error(e.toString()));
  }

  if (typeof error.errors !== 'undefined') {
    if (error.response?.status === 401) {
      logout();
    } else {
      if (typeof error.errors.errors !== 'undefined') {
        (error.errors.errors).forEach(error => {
          Alert.error(error.msg)
        });
      } else {
        if ((error.errors as errorMsg[])[0].msg === "Tidak ada hak akses") {
          logout();
        } else {
          (error.errors as errorMsg[]).forEach((error: errorMsg) => {
            Alert.error(error.msg)
          });
        }
      }
    }
  } else {
    Alert.error(error.toString());
  }
}