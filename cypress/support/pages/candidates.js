import {createQACustom as qa} from '../utils/utils';
import {createRandomString} from '../utils/utils';
import {chooseRandomFromDropdown} from '../utils/utils';

class Candidates {
  //Locators
  createCandidateButton = qa('createCandidateBtn');
  deleteCandidateButton = qa('deleteRow');
  editCandidateButton = qa('editRow');
  viewRow = qa('viewRow');
  saveCandidateButton = 'Save candidate';
  cancelCreateCandidateButton = 'Cancel';
  advancedSearchButton = 'Advanced Search';
  createCandidateModal = '#rcDialogTitle0';
  candidateNameInput = '#name';
  candidateSeniorityInput = 'Select Seniority';
  candidateEmailInput = '#email';
  candidatePhoneInput = '#phone';
  candidateCityInput = '#city';
  candidateFirstContactDate = '#firstContactDate';
  candidateLastContactDate = '#lastContactDate';
  candidateRecruiter = 'Select recruiter';
  candidateCvSource = 'Select CV source';
  candidateContactStatus = 'Select Contact status';
  candidateRole = 'Select Role';
  candidateExperienceInput = '#experience';
  confirmDeleteCandidateButton = 'Yes, delete candidate';
  confirmUpdateCandidateButton = 'Yes, update candidate';

  //Text utils
  candidatesPath = '/candidates';
  nameWasNotAddedErrorMessage = 'Full name is required.';
  seniorityNotSelectedErrorMessage = 'Seniority is required.';
  emailNotAddedErrorMessage = 'Email is required.';
  recruiterNotSelectedErrorMessage = 'The recruiter is required.';
  firstContactDateNotSelectedErrorMessage = 'First contact date is required.';
  lastContactDateNotSelectedErrorMessage = 'Last contact date is required.';
  cvSourceNotSelectedErrorMessage = 'CV source is required.';
  contactStatusNotSelectedErrorMessage = 'Contact Status is required.';
  roleNotSelectedErrorMessage = 'Role is required.';
  experienceWasNotAddedErrorMessage = 'Experience is required.';

  getCandidatesRequestObject = {
    method: 'GET',
    url: '**/api/v1/Candidates',
  };
  //Methods
  accesCandidates = () => {
    cy.visit(this.candidatesPath);
  };

  checkCreateCandidatesButton = () => {
    cy.get(this.createCandidateButton).should('be.visible').click();
    cy.get(this.createCandidateModal).should('be.visible');
  };

  checkCancelCreateCandidateButton = () => {
    cy.get(this.createCandidateButton).click();
    cy.get(this.createCandidateModal).should('be.visible');
    cy.contains(this.cancelCreateCandidateButton).click();
    cy.get(this.createCandidateModal).should('not.be.visible');
  };

  checkAdvancedSearchButton = () => {
    cy.contains(this.advancedSearchButton).should('be.visible').click();
    cy.contains('Name').should('be.visible');
  };

  selectSeniority = () => {
    cy.get('#seniorityId').click();
    cy.get('.qa-seniorityIdSelectValue').contains('Senior').click();
  };

  selectRecruiter = () => {
    cy.contains('Select Recruiter').click();
    cy.contains('Dimitrie Matei').click();
  };

  selectCvSource = () => {
    cy.contains('Select CV source').click();
    cy.contains('linkedin').click();
  };

  selectContactStatus = () => {
    cy.contains('Select Contact status').click();
    cy.contains('phone').click();
  };

  selectRole = () => {
    cy.get('#roleId').click();
    cy.get('.qa-roleIdSelectValue').contains('1').click();
  };
  completeCreateCandidateData = (name, email, phone, city, experience) => {
    //Type a candidate name
    cy.get(this.candidateNameInput).type(name);
    //Select seniority
    this.selectSeniority();
    //Type email
    cy.get(this.candidateEmailInput).type(email);
    //Type phone
    cy.get(this.candidatePhoneInput).type(phone);
    //Type city
    cy.get(this.candidateCityInput).type(city);
    //Select first contact date
    cy.get(this.candidateFirstContactDate).click();
    cy.get('[title="May 1, 2020"]').click();
    //Select recuiter
    this.selectRecruiter();
    //Select last contact date
    cy.get(this.candidateLastContactDate).click();
    cy.get('[class="ant-calendar-today-btn "]').click();
    //Select CV source
    this.selectCvSource();
    //Select contact status
    this.selectContactStatus();
    //Select role
    this.selectRole();
    //Type experience
    cy.get(this.candidateExperienceInput).type(experience);
  };

  addCandidate = (name, email, phone, city, experience) => {
    //Click Create Candidate button
    cy.get(this.createCandidateButton).click();
    //Enter data in form
    this.completeCreateCandidateData(name, email, phone, city, experience);
    //Click on the save button
    cy.contains(this.saveCandidateButton).click();
  };

  editCandidate = (newName, newEmail, newPhone, newCity, newExperience) => {
    //Click Edit Candidate button
    cy.get(this.editCandidateButton).click();
    this.completeCreateCandidateData(newName, newEmail, newPhone, newCity, newExperience);
    cy.contains(this.confirmUpdateCandidateButton).click();
  };

  deleteCandidate = (name) => {
    cy.contains('tr', name).find(this.deleteCandidateButton).click({force: true});
    cy.contains(this.confirmDeleteCandidateButton).click();
    this.checkCandidateIsDeleted(name);
  };

  waitGetCandidatesRequest = () => {
    cy.wait('@getCandidates');
  };

  addCandidateWithEmptyFields = () => {
    //Click Create Candidate button
    cy.get(this.createCandidateButton).click();
    //Click on name and email fields
    cy.get(this.candidateNameInput).click();
    cy.get(this.candidateEmailInput).click();
    //Click on the save button
    cy.contains(this.saveCandidateButton).click();
  };

  checkCandidateIsAdded = (name) => {
    cy.contains(name).should('be.visible');
  };

  checkCandidateIsDeleted = (name) => {
    cy.contains(name).should('not.be.visible');
  };

  checkCandidateWithEmptyfieldsErrorMessage = () => {
    cy.contains(this.nameWasNotAddedErrorMessage).scrollIntoView().should('be.visible');
    cy.contains(this.seniorityNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.emailNotAddedErrorMessage).should('be.visible');
    cy.contains(this.recruiterNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.firstContactDateNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.lastContactDateNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.cvSourceNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.contactStatusNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.roleNotSelectedErrorMessage).should('be.visible');
    cy.contains(this.experienceWasNotAddedErrorMessage).should('be.visible');
  };

  captureGetCandidatesRequest = () => {
    cy.server();
    cy.route(this.getCandidatesRequestObject).as('getCandidates');
  };
}

export default new Candidates();
