import {createRandomString} from '../../../../../support/utils/utils';
import {createRandomStringOnlyLetters} from '../../../../../support/utils/utils';
import {createRandomStringOnlyNumbers} from '../../../../../support/utils/utils';
import candidatesPage from '../../../../../support/pages/candidates';
import loginPage from '../../../../../support/pages/login';

let name;
let email;
let phone;
let city;
let experience;

let newName;
let newEmail;
let newPhone;
let newCity;
let newExperience;

//Test for the candidates page.
describe('Candidates page tests', () => {
  describe('Create tests.', () => {
    beforeEach(() => {
      name = createRandomStringOnlyLetters(6) + 'GG';
      email = createRandomString(4) + '@' + createRandomString(3) + '.com';
      phone = '07' + createRandomStringOnlyNumbers(8);
      city = 'Iasi';
      experience = createRandomStringOnlyNumbers(1);

      loginPage.login(loginPage.testUsername);
      candidatesPage.accesCandidates();
    });
    afterEach(() => {
      candidatesPage.deleteCandidate(name);
    });

    it('Check that new candidates can be added', () => {
      candidatesPage.addCandidate(name, email, phone, city, experience);
      candidatesPage.checkCandidateIsAdded(name);
    });

    it('Check that candidates can be updated', () => {
      newName = createRandomStringOnlyLetters(7) + 'GE';
      newEmail = createRandomString(4) + '@' + createRandomString(3) + '.ro';
      newPhone = '07' + createRandomStringOnlyNumbers(8);
      newCity = 'Oradea';
      newExperience = createRandomStringOnlyNumbers(1);

      candidatesPage.addCandidate(name, email, phone, city, experience);
      candidatesPage.captureGetCandidatesRequest();
      candidatesPage.waitGetCandidatesRequest();
      candidatesPage.editCandidate(name, newName, newEmail, newPhone, newCity, newExperience);
      name = newName;
      candidatesPage.checkCandidateIsAdded(newName);
    });
  });

  describe('Check tests.', () => {
    beforeEach(() => {
      loginPage.login(loginPage.testUsername);
      candidatesPage.accesCandidates();
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

    it('Check the incorrect email format error message', () => {
      candidatesPage.checkIncorrectEmailMessage(createRandomString(6));
    });
  });
});
