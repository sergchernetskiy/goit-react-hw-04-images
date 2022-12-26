import ContentLoader from 'react-content-loader';

export const LoaderSkeleton = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={780}
    viewBox="0 0 1200 780"
    backgroundColor="#351040"
    foregroundColor="#351051"
  >
    <rect x="10" y="10" rx="2" ry="2" width="380" height="250" />
    <rect x="400" y="10" rx="2" ry="2" width="380" height="250" />
    <rect x="790" y="10" rx="2" ry="2" width="380" height="250" />
    <rect x="10" y="270" rx="2" ry="2" width="380" height="250" />
    <rect x="400" y="270" rx="2" ry="2" width="380" height="250" />
    <rect x="790" y="270" rx="2" ry="2" width="380" height="250" />
    <rect x="10" y="530" rx="2" ry="2" width="380" height="250" />
    <rect x="400" y="530" rx="2" ry="2" width="380" height="250" />
    <rect x="790" y="530" rx="2" ry="2" width="380" height="250" />
  </ContentLoader>
);
