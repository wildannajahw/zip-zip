import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';
import { useDispatch } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// ----------------------------------------------------------------------

type FormValuesProps = {
  search: string;
  afterSubmit?: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const isMobile = useResponsive('down', 'sm');
  const isMountedRef = useIsMountedRef();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isHome = pathname === '/';

  const LoginSchema = Yup.object().shape({
    search: Yup.string().required('Search field is required'),
  });

  const defaultValues = {
    search: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      dispatch(getProducts(data));
      navigate('/products');
    } catch (error: any) {
      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}

      <RHFTextField
        name="search"
        placeholder="Cari Barangmu disini"
        type="text"
        fullWidth
        InputProps={
          !isMobile
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" type="submit">
                      <Iconify icon="bx:search" />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" type="submit">
                      <Iconify icon="bx:search" />
                    </IconButton>
                  </InputAdornment>
                ),
              }
        }
        size={isHome ? 'medium' : 'small'}
        isHome={isHome}
      />
    </FormProvider>
  );
}
