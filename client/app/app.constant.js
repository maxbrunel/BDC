"use strict";

angular.module("bdc")
    .constant("CONFIG",{
        teamID : "T0PSA99BN",
        slackOAuth : "authorize?scope=identity.basic,identity.email&client_id=23894315396.55118495363"
    })
    .constant("SKILLS" , {
            availableSkills : [
                'UI',
                'UX',
                "MOTION-DESIGN",
                "TYPOGRAPHIE",
                "ILLUSTRATION",
                "PHOTOGRAPHIE",
                "FRONT-END",
                "PRODUCT DESIGN",
                "BRANDING",
                "PRINT",
                "3D"
            ]
        }
    );
