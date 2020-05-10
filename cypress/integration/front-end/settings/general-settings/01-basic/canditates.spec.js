import {createRandomString} from '../../../../../support/utils/utils';
import candidatesPage from '../../../../../support/pages/candidates';
import loginPage from '../../../../../support/pages/login';

let name;
let seniority;
let email;
let recruiter;
let firstContactDate;
let lastContactDate;
let cvSource;
let contactStatus;
let role;
let experience;

//Test for the candidates page.
describe('Candidates page tests', () => {
  beforeEach(() => {
    name = createRandomString(6);
    email = 'test@test.com';
    firstContactDate = '01-04-2020';
    lastContactDate = '01-04-2020';
    experience = '4';

    loginPage.login(loginPage.testUsername);
    candidatesPage.accesCandidates();
  });

  describe('Create tests.', () => {
    it.only('Check that new candidates can be added', () => {
      candidatesPage.addCandidate(name, email, firstContactDate, lastContactDate, experience);
      //candidatesPage.checkCandidateIsAdded();
    });

    it('Check the Create Candidate button is visible and open the form', () => {
      candidatesPage.checkCreateCandidatesButton();
    });

    it('Check the Advanced Search button and open the form', () => {
      candidatesPage.checkAdvancedSearchButton();
    });

    it('Check that Cancel button in Create Candidate form works', () => {
      candidatesPage.checkCancelCreateCandidateButton();
    });

    it('Check that error message appear when candidate inputs are empty', () => {
      candidatesPage.addCandidateWithEmptyFields();
      candidatesPage.checkCandidateWithEmptyfieldsErrorMessage();
    });
  });
});
