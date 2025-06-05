import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import { IoCloudUploadOutline } from 'react-icons/io5';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const PlantImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnalysisResult(null);
    setError(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image/')) {
        setError(
          'Por favor selecione um arquivo de imagem válido (Exemplo: .jpg, .png, .gif, .webp).'
        );
        setSelectedFile(null);
        setPreviewUrl(null);
        event.target.value = '';
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Por favor selecione uma imagem para análise.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('plantImage', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/plants/analyze-plant-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAnalysisResult(response.data.analysis);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError(
          'Sem resposta do servidor. Verifique sua conexão de rede e tente novamente.'
        );
      } else {
        setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto mt-4 mb-10 bg-white rounded-xl shadow-md p-4">
      <Typography variant="h3" fontWeight="bold" component="h2" gutterBottom>
        <span className="text-primary underline">Flora</span>, sua assistente
        botânica inteligente!
      </Typography>
      <Typography variant="body1" color="text.secondary" marginBottom={3}>
        Faça o upload de uma imagem de uma planta. Nossa IA tentará
        identificá-la e fornecer informações sobre cuidados.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Button
          variant="outlined"
          sx={{ textTransform: 'none' }}
          component="label"
          startIcon={<IoCloudUploadOutline />}
        >
          {selectedFile
            ? `Trocar Imagem: ${selectedFile.name.substring(0, 30)}...`
            : 'Selecionar Imagem da Planta'}
          <input
            type="file"
            hidden
            accept="image/jpeg, image/png, image/gif, image/webp"
            onChange={handleFileChange}
          />
        </Button>

        {previewUrl && (
          <Box
            sx={{
              my: 2,
              textAlign: 'center',
              border: '1px dashed #ccc',
              padding: '10px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={previewUrl}
              alt="Plant preview"
              style={{
                maxWidth: '100%',
                maxHeight: '250px',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none', color: 'white' }}
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          size="large"
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Analisar Planta'
          )}
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        {analysisResult && (
          <Box
            sx={{
              mt: 3,
              p: 2.5,
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: '#f9f9f9',
              '& h1': {
                typography: 'h4',
                fontWeight: 'bold',
                mt: 2,
                mb: 1,
              },
              '& h2': {
                typography: 'h5',
                fontWeight: 'bold',
                mt: 2,
                mb: 1,
              },
              '& h3': {
                typography: 'h6',
                fontWeight: 'semibold',
                mt: 2,
                mb: 1,
              },
              '& p': { typography: 'body1', mb: 1 },
              '& ul': { pl: 2.5, mb: 1 },
              '& ol': { pl: 2.5, mb: 1 },
              '& li': { mb: 0.5 },
              '& strong': { fontWeight: 'bold' },
              '& em': { fontStyle: 'italic' },
              '& blockquote': {
                borderLeft: '4px solid #ccc',
                pl: 2,
                ml: 0,
                fontStyle: 'italic',
                color: 'text.secondary',
              },
              '& pre': {
                background: '#eee',
                p: 1.5,
                borderRadius: '4px',
                overflowX: 'auto',
              },
              '& code': {
                background: '#eee',
                p: '2px 4px',
                borderRadius: '3px',
                fontFamily: 'monospace',
              },
            }}
            className="mt-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
          >
            <Typography variant="h6" gutterBottom>
              Resultado da Análise:
            </Typography>
            <ReactMarkdown>{analysisResult}</ReactMarkdown>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PlantImageAnalyzer;
