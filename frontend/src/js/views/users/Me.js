import React from 'react';
import userIs from '../../utils/permissionUtils';
import DailyPoints from '../point/DailyPoints';

export default () => <div>{userIs('USER') && <DailyPoints />}</div>;
