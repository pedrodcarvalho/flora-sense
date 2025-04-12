import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const loginSchema = z.object({
  username: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser({ ...data })).unwrap();
      navigate('/dashboard');
    } catch (error: any) {
      setAuthError(error);
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar textColor="text-gray-700" />
      <Container
        maxWidth="sm"
        className="h-screen flex items-center justify-center"
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
              Log In
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
              sx={{
                textTransform: 'none',
                color: 'white',
                fontSize: '1rem',
                py: 1.5,
              }}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
