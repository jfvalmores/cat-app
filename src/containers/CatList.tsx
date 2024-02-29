import { ChangeEventHandler, FC, Fragment, ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import * as catService from '@/services/cats';
import { Breed, Cat } from '@/types';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { useCatContext } from '@/providers/CatProvider';
import { CAT_BREED_COOKIE_NAME, QUERY_DEFAULT_PAGE, QUERY_DEFAULT_LIMIT } from '@/constants';
import { Card } from '@/components/Card';
import Loading from '@/components/Loading';
import logger from '@/utils/logger';
import getUniqueItems from '@/utils/get-unique-items';
import { useToastContext } from '@/providers/ToastProvider';

const ViewButton = styled(Button)`
  width: 100%;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
`;

const CatRow = styled(Row)`
  row-gap: 1rem;
`;

const CatCard = styled(Card)`
  height: 100%;
`;

const LoadingRow = styled(Row)`
  margin: 1rem 0;
`;

const CatList: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { showToast } = useToastContext();
  const [_cookies, setCookie, removeCookie] = useCookies();
  const { breeds, cats, filters, selectedCatId, setBreeds, setCats, setFilters, setSelectedCatId } = useCatContext();
  const [isListLoading, setIsListLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch cats on load based on breed when the local store has no cats
  useEffect(() => {
    if (filters.breed && !cats.length) {
      getCats(filters.breed, filters.limit, filters.page);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Get all possible breeds
  useEffect(() => {
    if (!breeds.length) {
      getBreedList();
    }
  }, [breeds.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const getBreedList = useCallback(async () => {
    try {
      const result = await catService.getBreeds();
      const formattedResult = result.data?.map((item: Breed) => ({ label: item.name, value: item.id })) ?? [];
      setBreeds(formattedResult);
    } catch (error) {
      logger.error('Error fetching breeds', error);
      showToast({ type: 'error', message: 'Error fetching breeds' });
    }
  }, [setBreeds]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCats = useCallback(
    async (breed: string, limit: number, page: number) => {
      setIsListLoading(true);
      try {
        const currentCatLength = cats.length;
        const result = await catService.getCats({ breed, limit, page });
        if (result.data?.length) {
          const trimmedData = result.data.map((item: Cat) => ({ id: item.id, url: item.url }));
          const catSet = getUniqueItems(cats, trimmedData) as Cat[];
          setHasMore(catSet.length > currentCatLength);
          setCats(catSet);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setCats([]);
        logger.error('Error fetching cats', error);
        showToast({ type: 'error', message: 'Apologies but we could not load new cats for you at this time! Miau!' });
      }
      setIsListLoading(false);
    },
    [cats, setIsListLoading, setCats, setHasMore], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const selectBreed: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      setCats([]);
      const newFilters = { breed: e.target.value, limit: QUERY_DEFAULT_LIMIT, page: QUERY_DEFAULT_PAGE };
      setFilters({ breed: newFilters.breed, limit: newFilters.limit, page: newFilters.page });

      if (newFilters.breed) {
        setCookie(CAT_BREED_COOKIE_NAME, newFilters.breed, { path: '/' });
        getCats(newFilters.breed, newFilters.limit, newFilters.page);
      } else {
        removeCookie(CAT_BREED_COOKIE_NAME);
      }
    },
    [setCookie, setFilters, removeCookie, setCats, getCats],
  );

  const viewCat = useCallback(
    (id: string) => {
      setSelectedCatId(id);
      navigate(`/cats/${id}`);
    },
    [navigate, setSelectedCatId],
  );

  const loadMore = useCallback(() => {
    const newFilters = { ...filters, page: filters.page + 1 };
    setFilters({ ...filters, page: filters.page + 1 });
    getCats(newFilters.breed, newFilters.limit, newFilters.page);
  }, [filters, setFilters, getCats]);

  const isViewButtonLoading = useCallback((id: string) => selectedCatId === id, [selectedCatId]);

  return (
    <StyledContainer>
      <h1>Cat Browser</h1>
      {/* Breed filter */}
      <Row>
        <Col md={3} sm={6}>
          <Select isLoading={isListLoading} label="Breed" value={filters.breed} items={breeds} onChange={selectBreed} />
        </Col>
      </Row>
      {/* Cat list */}
      <Fragment>
        <CatRow>
          {cats.map((cat: Cat) => (
            <Col key={cat.id} md={3} sm={6}>
              <CatCard image={cat.url}>
                <ViewButton
                  variant="primary"
                  onClick={() => viewCat(cat.id)}
                  disabled={Boolean(selectedCatId)}
                  isLoading={isViewButtonLoading(cat.id)}
                >
                  View details
                </ViewButton>
              </CatCard>
            </Col>
          ))}
        </CatRow>
        {isListLoading && (
          <LoadingRow className="justify-content-center align-items-center">
            <Loading color="#3e3e3e" height={100} width={100} />
          </LoadingRow>
        )}
        {Boolean(filters.breed && cats.length && hasMore && !isListLoading) && (
          <Row>
            <Col md={3} sm={6}>
              <Button variant="success" onClick={loadMore} isLoading={isListLoading}>
                Load more
              </Button>
            </Col>
          </Row>
        )}
      </Fragment>
    </StyledContainer>
  );
};

export default CatList;
