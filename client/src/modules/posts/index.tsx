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
  Grid,
} from '@mui/material';
import { ModalContainer } from './styles';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { uploadImages, createPost } from '../../api/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import SimpleBackdrop from '../../common/backdrop';
import { getCategories } from '../../api/category';
import SimpleSelect from '../../common/select';
import { getLanguages } from '../../api/language/language';
import { getCountries } from '../../api/countries/country';
import axios from 'axios';
import { Close } from '@mui/icons-material';

interface AddPostProps {
  open: boolean;
  onClose: (flag: boolean) => void;
  categoryId?: any;
  OnSuccessFunc?: (flag: boolean) => void;
  defaults?: any;
}

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const AddPost = ({ onClose, open, OnSuccessFunc }: AddPostProps) => {
  const [images, setImages] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const [audios, setAudios] = useState<any>([]);
  const [input, setInputs] = useState<{ [key: string]: string }>();
  const [featured, setFeatured] = useState<boolean>(false);
  const [allowedExtensions, setAllowedExtensions] = useState<string>('');
  const [allowedMimeTypes, setAllowedMimeTypes] = useState<string>('');
  const [maxUploadSize, setMaxUploadSize] = useState<number | null>();
  const [imageAddType, setImageAddType] = useState<string>('upload');
  const [videoAddType, setVideoAddType] = useState<string>('upload');
  const [audioAddType, setAudioAddType] = useState<string>('upload');
  const [imageUrls, setImageUrls] = useState([
    {
      url: '',
      type: 'image',
    },
  ]);
  const [videoUrls, setVideoUrls] = useState([
    {
      url: '',
      type: 'video',
    },
  ]);
  const [audioUrls, setAudioUrls] = useState([
    {
      url: '',
      type: 'audio',
    },
  ]);

  const [advertisorType, setAdvertisorType] = useState<any>({});
  const [adType, setAdType] = useState<any>({});
  const [adRegion, setAdRegion] = useState<any>({});
  const [adLanguage, setAdLanguage] = useState<any>({});
  const [adCountry, setAdCountry] = useState<any>({});
  const [category, setCategory] = useState<any>({});
  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };
  const onDropImages = (acceptedFiles: File[]) => {
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

    const imageObjects = validFiles.map((file) => ({
      file,
      type: file.type,
    }));

    if (validFiles.length !== acceptedFiles.length) {
      alert('Some files are not valid. They have been ignored.');
    }

    setImages([...images, ...imageObjects]);
  };
  const onDropAudios = (acceptedFiles: File[]) => {
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

    const imageObjects = validFiles.map((file) => ({
      file,
      type: file.type,
    }));

    if (validFiles.length !== acceptedFiles.length) {
      alert('Some files are not valid. They have been ignored.');
    }

    setAudios([...audios, ...imageObjects]);
  };
  const onDropVideos = (acceptedFiles: File[]) => {
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

    const imageObjects = validFiles.map((file) => ({
      file,
      type: file.type,
    }));

    if (validFiles.length !== acceptedFiles.length) {
      alert('Some files are not valid. They have been ignored.');
    }

    setVideos([...videos, ...imageObjects]);
  };

  const imageDropZone = useDropzone({
    onDrop: onDropImages,
  });
  const videoDropZone = useDropzone({
    onDrop: onDropVideos,
  });
  const audioDropZone = useDropzone({
    onDrop: onDropAudios,
  });

  const { isLoading, mutate, isSuccess } = useMutation(
    async () => {
      if (input && input.title) {
        let uploadedImages = [];
        let uploadedAudios = [];
        let uploadedVideos = [];
        if (imageAddType === 'upload') {
          uploadedImages = await Promise.all(
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
        } else {
          uploadedImages = imageUrls;
        }
        if (videoAddType === 'upload') {
          uploadedVideos = await Promise.all(
            videos.map(async (imageObj: any) => {
              const formData = new FormData();
              formData.append('image', imageObj.file);
              const response = await uploadImages({ formData });
              return {
                url: response.data[0],
                type: imageObj.type,
              };
            })
          );
        } else {
          uploadedVideos = videoUrls;
        }
        if (audioAddType === 'upload') {
          uploadedAudios = await Promise.all(
            videos.map(async (imageObj: any) => {
              const formData = new FormData();
              formData.append('image', imageObj.file);
              const response = await uploadImages({ formData });
              return {
                url: response.data[0],
                type: imageObj.type,
              };
            })
          );
        } else {
          uploadedAudios = audioUrls;
        }
        await createPost({
          description: '',
          images: JSON.stringify([
            ...uploadedImages,
            ...uploadedAudios,
            ...uploadedVideos,
          ]),
          title: input.title as string,
          location: '',
          categoryId: category?.id,
          featured,
          advertiserType: advertisorType[0],
          adType: adType[0],
          adRegion: adRegion[0],
          adCountry: JSON.stringify(adCountry[0]),
          adLanguage: JSON.stringify(adLanguage[0]),
        });
      }
    },
    {
      onSuccess: () => {
        setImages([]);
        setAudios([]);
        setVideos([]);
        setFeatured(false);
        OnSuccessFunc && OnSuccessFunc(isSuccess);
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
  const adTypes = [
    {
      id: '0',
      label: 'Regular',
      value: 'REGULAR',
      subCategoryId: null,
    },
    {
      id: '1',
      label: 'Offer',
      value: 'OFFER',
      subCategoryId: null,
    },
    {
      id: '2',
      label: 'Job',
      value: 'JOB',
      subCategoryId: null,
    },
  ];
  const regions = [
    {
      id: '-1',
      label: 'All',
      value: 'All',
      subCategoryId: null,
    },
    {
      id: '0',
      label: 'North America',
      value: 'North America',
      subCategoryId: null,
    },
    {
      id: '1',
      label: 'South America',
      value: 'South America',
      subCategoryId: null,
    },
    {
      id: '2',
      label: 'Asia',
      value: 'Asia',
      subCategoryId: null,
    },
    {
      id: '3',
      label: 'Europe',
      value: 'Europe',
      subCategoryId: null,
    },
    {
      id: '4',
      label: 'Africa',
      value: 'Africa',
      subCategoryId: null,
    },
    {
      id: '5',
      label: 'Oceania',
      value: 'Oceania',
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
            marginTop: 100,
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
            paddingBottom={0}
            fontWeight={800}
            fontSize={30}
          >
            Create Ad
          </Typography>
          <Typography component={'div'} display={'flex'}>
            <SimpleSelect
              list={advertisorTypes}
              onChange={(e: any) => setAdvertisorType(e)}
              placeholder="Advertisor Type"
            />

            <SimpleSelect
              list={adTypes}
              onChange={(e: any) => setAdType(e)}
              placeholder="Ad Type"
            />

            {data?.length > 0 && (
              <SimpleSelect
                list={data}
                onChange={(e: any) => setCategory(e[e.length - 1])}
                placeholder="Category"
              />
            )}
          </Typography>
          <Typography component={'div'} display={'flex'} marginTop={'10px'}>
            {langauges?.length > 0 && (
              <SimpleSelect
                list={langauges}
                onChange={(e: any) => setAdLanguage(e[0])}
                placeholder="Ad Language"
              />
            )}

            <SimpleSelect
              list={regions}
              onChange={(e: any) => setAdRegion(e)}
              placeholder="Region"
            />

            {countries?.length > 0 && (
              <SimpleSelect
                list={countries}
                onChange={(e: any) => setAdCountry(e[0])}
                placeholder="Country"
              />
            )}
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={featured}
                  defaultChecked
                  onChange={(e) => setFeatured(e.target.checked)}
                />
              }
              label="Make this add featured"
            />
          </FormGroup>
          <TextField
            variant="outlined"
            name="title"
            margin="dense"
            fullWidth
            onChange={handleSetInput}
            placeholder="Title"
          />
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ color: '#4285F4', textAlign: 'center' }}
            >
              How would you like to add post media?
            </FormLabel>
            <Typography
              sx={{ fontWeight: 'bold', color: 'green', fontSize: 20 }}
            >
              Url added media will be posted immediatly
            </Typography>
          </FormControl>
          <Grid
            container
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Grid
              item
              md={3}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
              <h2 style={{ margin: 2 }}>
                Add images{' '}
                <img
                  src="/add.png"
                  alt=""
                  onClick={() => {
                    const cMediaUrls = [...imageUrls];
                    cMediaUrls.push({
                      type: '',
                      url: '',
                    });
                    setImageUrls(cMediaUrls);
                  }}
                />
              </h2>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="upload"
                name="radio-buttons-group"
                sx={{
                  display: 'flex !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onChange={(e) => setImageAddType(e.target.value)}
              >
                <FormControlLabel
                  value="upload"
                  control={<Radio />}
                  label="Upload"
                  sx={{ display: 'inline' }}
                />
                <FormControlLabel
                  value="add_urls"
                  control={<Radio />}
                  label="Add Urls"
                  sx={{ display: 'inline' }}
                />
              </RadioGroup>
              {imageAddType === 'upload' ? (
                <>
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginX: 10,
                    }}
                    {...imageDropZone.getRootProps()}
                  >
                    <input {...imageDropZone.getInputProps()} />
                    {imageDropZone.isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div
                        style={{
                          width: '200px',
                          height: '100px',
                          background: 'green',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          color: 'white',
                          display: 'flex',
                        }}
                      >
                        Drag 'n' drop some files here, or click to select files
                      </div>
                    )}
                  </Box>
                  {images?.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        marginY: 2,
                        justifyContent: 'center',
                        height: '80px',
                        overflowY: 'scroll',
                      }}
                    >
                      Images:
                      {images.map((image: any, index: any) => (
                        <Typography
                          key={index}
                          component={'span'}
                          marginX={1}
                          fontWeight="bolder"
                        >
                          {image.file.name?.slice(0, 10)}...
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      height: '100px',
                      overflowY: 'scroll',
                      width: '400px',
                    }}
                  >
                    {imageUrls?.map((item, idx) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '5px 0px',
                          }}
                          key={idx}
                        >
                          <TextField
                            value={imageUrls[idx].url}
                            onChange={(e) => {
                              const cMediaUrls = [...imageUrls];
                              cMediaUrls[idx].url = e.target.value;
                              setImageUrls(cMediaUrls);
                            }}
                            sx={{ background: 'green' }}
                          />

                          {imageUrls.length > 1 && (
                            <span
                              onClick={() => {
                                const cMediaUrls = [...imageUrls];
                                cMediaUrls.splice(idx, 1);
                                setImageUrls(cMediaUrls);
                              }}
                            >
                              <Close sx={{ ml: 2, cursor: 'pointer' }} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </Grid>

            <Grid
              item
              md={3}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
              <h2 style={{ margin: 2 }}>
                Add video{' '}
                <img
                  src="/add.png"
                  alt=""
                  onClick={() => {
                    const cMediaUrls = [...videoUrls];
                    cMediaUrls.push({
                      type: '',
                      url: '',
                    });
                    setVideoUrls(cMediaUrls);
                  }}
                />
              </h2>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="upload"
                name="radio-buttons-group"
                sx={{
                  display: 'flex !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onChange={(e) => setVideoAddType(e.target.value)}
              >
                <FormControlLabel
                  value="upload"
                  control={<Radio />}
                  label="Upload"
                  sx={{ display: 'inline' }}
                />
                <FormControlLabel
                  value="add_urls"
                  control={<Radio />}
                  label="Add Urls"
                  sx={{ display: 'inline' }}
                />
              </RadioGroup>
              {videoAddType === 'upload' ? (
                <>
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginX: 10,
                    }}
                    {...videoDropZone.getRootProps()}
                  >
                    <input {...videoDropZone.getInputProps()} />
                    {videoDropZone.isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div
                        style={{
                          width: '200px',
                          height: '100px',
                          background: 'green',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          color: 'white',
                          display: 'flex',
                        }}
                      >
                        Drag 'n' drop some files here, or click to select files
                      </div>
                    )}
                  </Box>
                  {videos?.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        marginY: 2,
                        justifyContent: 'center',
                        height: '80px',
                        overflowY: 'scroll',
                      }}
                    >
                      Videos:
                      {videos.map((image: any, index: any) => (
                        <Typography
                          key={index}
                          component={'span'}
                          marginX={1}
                          fontWeight="bolder"
                        >
                          {image.file.name?.slice(0, 10)}...
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      height: '100px',
                      overflowY: 'scroll',
                      width: '400px',
                    }}
                  >
                    {videoUrls?.map((item, idx) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '5px 0px',
                          }}
                          key={idx}
                        >
                          <TextField
                            value={videoUrls[idx].url}
                            onChange={(e) => {
                              const cMediaUrls = [...videoUrls];
                              cMediaUrls[idx].url = e.target.value;
                              cMediaUrls[idx].type = 'video';

                              setVideoUrls(cMediaUrls);
                            }}
                            sx={{ background: 'green' }}
                          />

                          {videoUrls.length > 1 && (
                            <span
                              onClick={() => {
                                const cMediaUrls = [...videoUrls];
                                cMediaUrls.splice(idx, 1);
                                setVideoUrls(cMediaUrls);
                              }}
                            >
                              <Close sx={{ ml: 2, cursor: 'pointer' }} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </Grid>
            <Grid
              item
              md={3}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
              <h2 style={{ margin: 2 }}>
                Add audio{' '}
                <img
                  src="/add.png"
                  alt=""
                  onClick={() => {
                    const cMediaUrls = [...audioUrls];
                    cMediaUrls.push({
                      type: '',
                      url: '',
                    });
                    setAudioUrls(cMediaUrls);
                  }}
                />
              </h2>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="upload"
                name="radio-buttons-group"
                sx={{
                  display: 'flex !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onChange={(e) => setAudioAddType(e.target.value)}
              >
                <FormControlLabel
                  value="upload"
                  control={<Radio />}
                  label="Upload"
                  sx={{ display: 'inline' }}
                />
                <FormControlLabel
                  value="add_urls"
                  control={<Radio />}
                  label="Add Urls"
                  sx={{ display: 'inline' }}
                />
              </RadioGroup>
              {audioAddType === 'upload' ? (
                <>
                  <Box
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',

                      marginX: 10,
                    }}
                    {...audioDropZone.getRootProps()}
                  >
                    <input {...audioDropZone.getInputProps()} />
                    {audioDropZone.isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div
                        style={{
                          width: '200px',
                          height: '100px',
                          background: 'green',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          color: 'white',
                          display: 'flex',
                        }}
                      >
                        Drag 'n' drop some files here, or click to select files
                      </div>
                    )}
                  </Box>
                  {audios?.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        marginY: 2,
                        justifyContent: 'center',
                        height: '80px',
                        overflowY: 'scroll',
                      }}
                    >
                      Audios:
                      {audios.map((image: any, index: any) => (
                        <Typography
                          key={index}
                          component={'span'}
                          marginX={1}
                          fontWeight="bolder"
                        >
                          {image.file.name?.slice(0, 10)}...
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      height: '100px',
                      overflowY: 'scroll',
                      width: '400px',
                    }}
                  >
                    {audioUrls?.map((item, idx) => {
                      return (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '5px 0px',
                          }}
                          key={idx}
                        >
                          <TextField
                            value={audioUrls[idx].url}
                            onChange={(e) => {
                              const cMediaUrls = [...audioUrls];
                              cMediaUrls[idx].url = e.target.value;
                              cMediaUrls[idx].type = 'audio';
                              setAudioUrls(cMediaUrls);
                            }}
                            sx={{ background: 'green' }}
                          />

                          {audioUrls.length > 1 && (
                            <span
                              onClick={() => {
                                const cMediaUrls = [...audioUrls];
                                cMediaUrls.splice(idx, 1);
                                setAudioUrls(cMediaUrls);
                              }}
                            >
                              <Close sx={{ ml: 2, cursor: 'pointer' }} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2>Also post on our media platforms</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        <img src="/yt.png" alt="" style={{ width: 18 }} />
                      </>
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        <img src="/ig.png" alt="" style={{ width: 18 }} />
                      </>
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        <img src="/twt.png" alt="" style={{ width: 18 }} />
                      </>
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <>
                        <img src="/fb.png" alt="" style={{ width: 18 }} />
                      </>
                    }
                    labelPlacement="start"
                  />
                </FormGroup>
              </div>
            </div>
          </Box>
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
                background: 'green',
                fontWeight: 700,
                textTransform: 'capitalize',
                fontSize: '20px',
                '&:hover': {
                  background: 'green',
                },
                mt: -4,
              }}
            >
              Create Ad
            </Button>
          </Box>
        </div>

        <SimpleBackdrop open={isLoading} />
      </ModalContainer>
    </Modal>
  );
};

export default AddPost;
