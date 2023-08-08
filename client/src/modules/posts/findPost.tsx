import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Grid,
  createStyles,
} from '@mui/material';
import { ModalContainer } from './styles';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { uploadImages, createPost } from '../../api/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import SimpleBackdrop from '../../common/backdrop';
import { getCategories } from '../../api/category';
import SimpleSelect, { StyledSelectProps } from '../../common/select';
import { getLanguages } from '../../api/language/language';
import { getCountries } from '../../api/countries/country';
import axios from 'axios';
import { AddAPhoto, AddCircle, Close } from '@mui/icons-material';
import StyledButton from '../../common/button';
import Translate from '../../common/translate/Translate';

interface FindPostProps {
  open: boolean;
  onClose: (flag: boolean) => void;
}

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const FindPost = ({ onClose, open }: FindPostProps) => {
  const [images, setImages] = useState<any>([]);
  const [input, setInputs] = useState<{ [key: string]: string }>();
  const [featured, setFeatured] = useState<boolean>(false);
  const [allowedExtensions, setAllowedExtensions] = useState<string>('');
  const [allowedMimeTypes, setAllowedMimeTypes] = useState<string>('');
  const [maxUploadSize, setMaxUploadSize] = useState<number | null>();
  const [mediaAddType, setMediaAddType] = useState<string>('upload');
  const [mediaUrls, setMediaUrls] = useState([
    {
      url: '',
      type: '',
    },
  ]);
  const onDrop = (acceptedFiles: File[]) => {
    const allowedExtensionsArray = allowedExtensions.split(',');
    const allowedMimeTypesArray = allowedMimeTypes.split(',');
    const maxUploadSizeInBytes = Number(maxUploadSize) * 1048576; // converting MB to bytes

    const validFiles = acceptedFiles.filter((file) => {
      const fileExtension: any = file.name.split('.').pop()?.toLowerCase();
      return (
        allowedExtensionsArray.includes(fileExtension) &&
        allowedMimeTypesArray.includes(file.type) &&
        file.size <= (maxUploadSizeInBytes || Infinity)
      );
    });

    // Create an array of image objects
    const imageObjects = validFiles.map((file) => ({
      file,
      type: file.type,
    }));

    if (validFiles.length !== acceptedFiles.length) {
      alert('Some files are not valid. They have been ignored.');
    }

    // Set the imageObjects state
    setImages([...images, ...imageObjects]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };

  const { isLoading, mutate, isSuccess } = useMutation(
    async () => {
      if (input && input.Description && input.location) {
        if (mediaAddType === 'upload') {
          const uploadedImages = await Promise.all(
            images.map(async (imageObj: any) => {
              const formData = new FormData();
              formData.append('image', imageObj.file);
              const response = await uploadImages({ formData });
              return {
                url: response.data[0],
                type: imageObj.type,
              };
            })
          );
          await createPost({
            Description: input.Description as string,
            imagesId: JSON.stringify(uploadedImages),
            title: input.title as string,
            location: input.location as string,

            featured,
          });
        } else {
          await createPost({
            Description: input.Description as string,
            imagesId: JSON.stringify(mediaUrls),
            title: input.title as string,
            location: input.location as string,

            featured,
          });
        }
      }
    },
    {
      onSuccess: () => {
        setImages([]);
        setFeatured(false);
      },
      onSettled: () => {
        onClose(false);
      },
    }
  );

  const { data }: any = useQuery(
    ['GetCategores'],
    async () => await getCategories(),
    {
      select: ({ data }) => {
        const result: any = data.map(
          (val: {
            name: string;
            id: string;
            subCategoryId: string | undefined | null;
          }) => ({
            label: val.name,
            value: val,
            id: val.id,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );
  const { data: langauges }: any = useQuery(
    ['GetLanguages'],
    async () => await getLanguages(),
    {
      select: (data) => {
        const result = data?.map(
          (val: {
            id: string;
            code: string;
            name: string;
            subCategoryId: string | undefined | null;
          }) => ({
            id: val.id,
            label: val.name,
            value: val,
            code: val.code,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );
  const { data: countries }: any = useQuery(
    ['GetCountries'],
    async () => await getCountries(),
    {
      select: (data) => {
        const result = data?.map(
          (val: {
            id: string;
            code: string;
            name: string;
            subCategoryId: string | undefined | null;
          }) => ({
            id: val.id,
            label: val.name,
            value: val,
            code: val.code,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );

  useEffect(() => {
    axios.get(URL + '/uploads').then((response) => {
      setAllowedExtensions(response?.data?.allowedExtensions);
    });
  }, []);
  useEffect(() => {
    axios.get(URL + '/uploads').then((response) => {
      setAllowedMimeTypes(response?.data?.allowedMimeTypes);
    });
  }, []);
  useEffect(() => {
    axios.get(URL + '/uploads').then((response) => {
      setMaxUploadSize(parseInt(response?.data?.maxUploadSize));
    });
  }, []);

  const advertisorTypes = [
    {
      id: '0',
      label: 'Individual',
      value: 'Individual',
      subCategoryId: null,
    },
    {
      id: '1',
      label: 'Business',
      value: 'Business',
      subCategoryId: null,
    },
  ];
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <img
            src="/cross.png"
            alt=""
            style={{
              position: 'absolute',
              right: 4,
              top: 6,
              cursor: 'pointer',
            }}
            onClick={onClose as any}
          />
          <Typography
            component={'div'}
            textAlign={'center'}
            color={'#fff'}
            paddingBottom={10}
            fontWeight={800}
            fontSize={30}
          >
            SEARCH ADS
          </Typography>
          <Typography component={'div'} display={'flex'}>
            {data?.length > 0 && (
              <SimpleSelect
                list={advertisorTypes}
                onChange={() => ({})}
                placeholder="Advertisor Type"
              />
            )}
            {langauges?.length > 0 && (
              <SimpleSelect
                list={langauges}
                onChange={() => ({})}
                placeholder="Ad Type"
              />
            )}
            {countries?.length > 0 && (
              <SimpleSelect
                list={countries}
                onChange={() => ({})}
                placeholder="Category"
              />
            )}
          </Typography>
          <Typography component={'div'} display={'flex'} marginTop={'10px'}>
            {data?.length > 0 && (
              <SimpleSelect
                list={data}
                onChange={() => ({})}
                placeholder="Ad Language"
              />
            )}
            {langauges?.length > 0 && (
              <SimpleSelect
                list={langauges}
                onChange={() => ({})}
                placeholder="Region"
              />
            )}
            {countries?.length > 0 && (
              <SimpleSelect
                list={countries}
                onChange={() => ({})}
                placeholder="Country"
              />
            )}
          </Typography>
          <div style={{ margin: '30px 0px' }}>
            <StyledButton label={<Translate>GO</Translate>} />
          </div>
          <Typography sx={{ fontSize: 23, color: 'green', fontWeight: 'bold' }}>
            OR by
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              margin: '30px 0px',
            }}
          >
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              label="Keywords"
              placeholder="keywords"
              InputLabelProps={{
                style: {
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000',
                },
              }}
              sx={{
                border: '1px solid black',
                borderRadius: 2,
                mr: 3,
              }}
            />
            <StyledButton label={<Translate>GO</Translate>} />
          </div>

          {/*
          <TextField
            variant="outlined"
            name="location"
            margin="dense"
            fullWidth
            onChange={handleSetInput}
            placeholder="Location"
          />
          <TextField
            variant="outlined"
            name="Description"
            margin="dense"
            fullWidth
            onChange={handleSetInput}
            placeholder="Description"
          /> */}

          <Box
            width={'100%'}
            justifyContent={'end'}
            display={'flex'}
            height={'25px'}
          >
            <Button
              variant="contained"
              onClick={() => mutate()}
              sx={{
                borderRadius: '8px',
                py: 2,
                mt: -2,
                background: 'green',
                fontWeight: 700,
                textTransform: 'capitalize',
                fontSize: '20px',
                '&:hover': {
                  background: 'green',
                },
              }}
            >
              Find ad
            </Button>
          </Box>
        </div>

        <SimpleBackdrop open={isLoading} />
      </ModalContainer>
    </Modal>
  );
};

export default FindPost;
