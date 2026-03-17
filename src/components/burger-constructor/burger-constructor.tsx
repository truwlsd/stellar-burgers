import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../services/slices/constructorSlice';
import { placeOrder, clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { orderRequest, orderModalData } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user.data);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const orderData = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(placeOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((err) => console.error(err));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const handleMoveUp = (index: number) => {
    dispatch(moveIngredientUp(index));
  };

  const handleMoveDown = (index: number) => {
    dispatch(moveIngredientDown(index));
  };

  const handleClose = (item: TConstructorIngredient) => {
    dispatch(removeIngredient(item.id));
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (total: number, item: TConstructorIngredient) => total + item.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
};
