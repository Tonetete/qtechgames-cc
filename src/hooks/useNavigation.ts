import { useNavigate } from 'react-router-dom';

export const useSafeNavigation = () => {
  const navigate = useNavigate();

  const goBack = () => {
    const canGoBack = window.history.state && window.history.state.idx > 0;

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return {
    goBack,
    navigate,
  };
};
