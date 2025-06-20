import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  username: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser({ ...data, email: data.username })).unwrap();
      navigate('/dashboard');
    } catch (error: any) {
      setAuthError(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'grey.100' }}>
      <Navbar textColor="text-gray-700" />
      <Container
        maxWidth="sm"
        sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', fontSize: '2.25rem' }}
            >
              Registrar-se
            </Typography>
            <Typography variant="body2">
              Já possue uma conta?{' '}
              <Link href="/login" underline="hover">
                Log in
              </Link>
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              sx={{ mb: 4 }}
              gridTemplateRows={'auto'}
              gridTemplateColumns={'1fr 1fr'}
              gap={4}
              display="grid"
            >
              <Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nome"
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Sobrenome"
                  {...register('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="E-mail"
                  type="username"
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Senha"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
            </Grid>
            {authError.message && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {authError.message}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              size="large"
              sx={{
                textTransform: 'none',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                py: 1.5,
                backgroundColor: '#4ade80',
                '&:hover': {
                  backgroundColor: '#16a34a',
                },
              }}
            >
              Criar conta
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Register;
