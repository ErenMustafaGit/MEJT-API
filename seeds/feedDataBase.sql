setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id)+1, 1), false) FROM users;

INSERT INTO "users" VALUES (1, 'user1@gmail.com', '$2b$10$X3o5fDDCzWWGp6Ec68BETuEZMTSpGwWo96XZTPYAITXqJ6ltZfFJ.', 'user1', 0); 
-- PASSWORD : user1user
INSERT INTO "users" VALUES (2, 'user2@gmail.com', '$2b$10$VSeBwEwfqrZWvJ2oVfPQpeDHERHopTGmNavolEdR9ORV2rrwliFOa', 'user2', 0);
-- PASSWORD : user2user
INSERT INTO "users" VALUES (3, 'user3@gmail.com', '$2b$10$dtW1yGNuWEHW25AYC9cvIuJEru9r33/ZFHXfumc7Tphr7DJ.O6JoK', 'user3', 1);
-- PASSWORD : user3user
INSERT INTO "users" VALUES (4, 'user4@gmail.com', '$2b$10$.8cWK57d.pg8TdGbxeLMOe1DsHAZ8WR7E3r3Q7WlyBnprAGYwl3US', 'user4', 1);
-- ....
INSERT INTO "users" VALUES (5, 'user5@gmail.com', '$2b$10$yLFu8NY41v9rmzz7qSHCmeo0vCkOWX0AS8.okSjJBvJP40xblp1AO', 'user5', 1);
INSERT INTO "users" VALUES (6, 'user6@gmail.com', '$2b$10$ZvEPS748NTeb3LLc6R84m.UTtEeWOGgse5U.QfsLqH9vPveFYEYbm', 'user6', 1);
INSERT INTO "users" VALUES (7, 'user7@gmail.com', '$2b$10$a876Cr2QcTNXXgNd/zknIet6asFway7OzgDieHA/BMXQk94QbgfgO', 'user7', 1);
INSERT INTO "users" VALUES (8, 'user8@gmail.com', '$2b$10$GIf8cjJqmgrRQ6y.gcg.Ae/PYoWrg92YgqdqUwq7TzZKZI40eD1Hi', 'user8', 1);
INSERT INTO "users" VALUES (9, 'user9@gmail.com', '$2b$10$usIGoADM5dspuGsafDY0HO7D0rLp2GpEvRUSA8/pB/D6RUXxpxqH.', 'user9', 1);

INSERT INTO "teams" VALUES (1, 'football club Villeurbanne', 1);
INSERT INTO "teams" VALUES (2, 'Entrainement perso', 1);

INSERT INTO "usersTeamMapping" VALUES (0, 1, 3);
INSERT INTO "usersTeamMapping" VALUES (1, 1, 4);
INSERT INTO "usersTeamMapping" VALUES (2, 1, 5);
INSERT INTO "usersTeamMapping" VALUES (3, 1, 6);
INSERT INTO "usersTeamMapping" VALUES (4, 1, 7);
INSERT INTO "usersTeamMapping" VALUES (5, 2, 8);

INSERT INTO "sessions" VALUES (1, (SELECT NOW() - interval '5 day'), 'stade de foot, Lyon', 'travail sur les jambes', 'Entrainement : Bas du corps', 1);
INSERT INTO "sessions" VALUES (2, (SELECT NOW() + interval '5 day'), 'stade de foot, Villeurbanne', 'travail sur les bras', 'Entrainement : haut du corps', 1);

INSERT INTO "feedbacksSession" VALUES (1, 5, 6, 6, 6, 'cheville droite', (SELECT NOW() - interval '3 day'), 3, 1);
INSERT INTO "feedbacksSession" VALUES (2, 8, 2, 3, 8, '', (SELECT NOW() - interval '3 day'), 4, 1);
