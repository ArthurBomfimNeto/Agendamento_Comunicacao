const schedule_controller = require('../../controllers/users_controller')

describe('Verify calls functions', () =>{
    it('Verify if function registerUsers is called', () => {
       const registerUsers = jest.spyOn(schedule_controller, 'registerUsers')
       registerUsers();
       expect(registerUsers).toBeCalled()
    });

    it('Verify if function loginUsers is called', () => {
        const loginUsers = jest.spyOn(schedule_controller, 'loginUsers')
        loginUsers();
        expect(loginUsers).toBeCalled()
     });
});
