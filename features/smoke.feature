@smoke
Feature: CRUD operations over the /Objects endpoint at Restful-API

Background: 
        Given user has access to Restful-API Dev

    Scenario: Retrieve list of objects in Restful-API Dev 
        When user makes a request to retrieve all the objects
        Then user should get a status code 200
        And user should get list of objects

    Scenario: Retrieve list of objects by IDs in Restful-API Dev 
        When user makes a request to retrieve the objects with IDs '1','2','3'
        Then user should get a status code 200
        And user should get list of objects with IDs '1','2','3'

    Scenario: Retrieve an object by ID in Restful-API Dev 
        When user makes a request to retrieve an object with ID '1'
        Then user should get a status code 200
        And user should get the object with ID '1'

    Scenario: Add an object to Restful-API Dev 
        When user makes a request to add an object with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Then user should get a status code 200
        And user should be able to retrieve the object that was added with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Examples:
            | Name     | Year | Price   | CPU        | DiskSize |
            | iPhone14 | 2023 | 1200.34 | Intel Core | 1 TB     |

    Scenario: Update an object to Restful-API Dev 
        When user makes a request to add an object with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Then user should get a status code 200
        And user should be able to retrieve the object that was added with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        When user makes a request to update an object with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Then user should get a status code 200
        And user should be able to retrieve the object that was updated with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Examples:
            | Name     | Year | Price   | CPU        | DiskSize |
            | iPhone12 | 2021 | 1000.34 | Intel Core | 2 TB     |

    Scenario: Partially update an object to Restful-API Dev
        When user makes a request to add an object with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Then user should get a status code 200
        And user should be able to retrieve the object that was added with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>" 
        When user makes a request to partially update an object
        Then user should get a status code 200
        And user should be able to retrieve the object that was partialy updated
        And user should retrieve same values for all fields as retrieved except the updated field
        Examples:
            | Name     | Year | Price   | CPU        | DiskSize |
            | iPhone12 | 2021 | 1000.34 | Intel Core | 2 TB     |

    Scenario: Delete an object that was added to Restful-API Dev 
        When user makes a request to add an object with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        Then user should get a status code 200
        And user should be able to retrieve the object that was added with the details "<Name>","<Year>","<Price>","<CPU>","<DiskSize>"
        When user makes a request to delete the object that was just added
        And user should receive a message that object has been deleted
        Examples:
            | Name     | Year | Price   | CPU        | DiskSize |
            | iPhone14 | 2023 | 1200.34 | Intel Core | 1 TB     |

    