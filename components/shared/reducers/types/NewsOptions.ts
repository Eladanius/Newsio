type NewsOptions = {
  categories?: string[] | null | undefined;
  languages?: string[] | null | undefined;
  countries?: string[] | null | undefined;
  [key: string]: string | string[] | null | undefined;
};

export default NewsOptions;
