const schedule_controller = require('../../controllers/schedule_controller')

describe('Verify calls functions', () =>{
    it('Verify if function getScheduling is called', () => {
       const spiedGetScheduling = jest.spyOn(schedule_controller, 'getScheduling')
       spiedGetScheduling();
       expect(spiedGetScheduling).toBeCalled()
    });

    it('Verify if function postScheduling is called', () => {
        const spiedPostScheduling = jest.spyOn(schedule_controller, 'postScheduling')
        spiedPostScheduling();
        expect(spiedPostScheduling).toBeCalled()
    });

    it('Verify if function get1Scheduling is called', () => {
        const spiedGetScheduling = jest.spyOn(schedule_controller, 'get1Scheduling')
        spiedGetScheduling();
        expect(spiedGetScheduling).toBeCalled()
    });

    it('Verify if function patchScheduling is called', () => {
        const spiedPatchScheduling = jest.spyOn(schedule_controller, 'patchScheduling')
        spiedPatchScheduling();
        expect(spiedPatchScheduling).toBeCalled()
    });

    it('Verify if function deleteScheduling is called', () => {
        const spiedDeleteScheduling = jest.spyOn(schedule_controller, 'deleteScheduling')
        spiedDeleteScheduling();
        expect(spiedDeleteScheduling).toBeCalled()
    });

})