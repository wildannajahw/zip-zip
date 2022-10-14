import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useResponsive from '../../hooks/useResponsive';
// ----------------------------------------------------------------------

type FormValuesProps = {
  search: string;
  afterSubmit?: string;
};

export default function LoginForm() {
  const isMobile = useResponsive('down', 'sm');
  const isMountedRef = useIsMountedRef();

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
      console.log(data);
    } catch (error: any) {
      console.error(error);

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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start">
                <Iconify icon="bx:search" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: isMobile ? '300px' : '600px' }}
      />
    </FormProvider>
  );
}