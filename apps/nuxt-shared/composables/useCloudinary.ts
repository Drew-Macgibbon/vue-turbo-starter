interface Transforms {
  article: {
    large: string
    medium: string
    small: string
  }
  avatar: {
    small: string
    medium: string
    large: string
  }
}

const transforms: Transforms = {
  article: {
    large: 'c_scale,w_2000',
    medium: 'c_scale,w_900',
    small: 'c_scale,w_640',
  },
  avatar: {
    small: 'c_scale,w_60',
    medium: 'c_scale,w_120',
    large: 'c_scale,w_180',
  },
}

export default function useCloudinary() {
  const base = 'https://res.cloudinary.com/mlfx/image/upload/f_auto/'

  function imgWithTransforms(path: string, transforms: string): string {
    const url = `${base}${transforms}/${path}`
    return url
  }

  return {
    imgWithTransforms,
    transforms,
  }
}
