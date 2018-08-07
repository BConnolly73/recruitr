import {login, logout} from '../../actions/auth';

test('login', () => {
    const action = login('brad');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'brad'
    })
});

test('logout', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    })
});