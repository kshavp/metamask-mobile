import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo } from 'react';
import Routes from '../../../../../constants/navigation/Routes';
import { useFiatOnRampSDK } from '../../common/sdk';
import { Region } from '../../common/types';
import useSDKMethod from '../../common/hooks/useSDKMethod';

export default function useRegions() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    selectedRegion,
    setSelectedRegion,
    unsupportedRegion,
    setUnsupportedRegion,
  } = useFiatOnRampSDK();

  const [{ data, isFetching, error }, queryGetCountries] =
    useSDKMethod('getCountries');

  const updatedRegion = useMemo(() => {
    if (!selectedRegion || !data) return null;
    const allRegions: Region[] = data.reduce(
      (acc: Region[], region: Region) => [
        ...acc,
        region,
        ...((region.states as Region[]) || []),
      ],
      [],
    );
    return allRegions.find((region) => region.id === selectedRegion.id) ?? null;
  }, [data, selectedRegion]);

  useEffect(() => {
    if (updatedRegion?.unsupported) {
      setSelectedRegion(null);
      setUnsupportedRegion(updatedRegion);

      if (
        route.name !== Routes.RAMP.BUY.REGION &&
        route.name !== Routes.RAMP.BUY.REGION_HAS_STARTED
      ) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Routes.RAMP.BUY.REGION,
            },
          ],
        });
      }
    }
  }, [
    updatedRegion,
    setSelectedRegion,
    navigation,
    route.name,
    setUnsupportedRegion,
  ]);

  const clearUnsupportedRegion = useCallback(
    () => setUnsupportedRegion(undefined),
    [setUnsupportedRegion],
  );

  return {
    data,
    isFetching,
    error,
    query: queryGetCountries,
    selectedRegion,
    unsupportedRegion,
    clearUnsupportedRegion,
  };
}
