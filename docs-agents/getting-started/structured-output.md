---
sidebar_position: 7
title: "Structured Output"
pagination_prev: null
---
import VideoEmbed from "@site/src/components/VideoEmbed";
import Image from "@site/src/components/Image";
import VersionedLink from '@site/src/components/VersionedLink';
import ArrowRight from '@site/static/icons/arrow_right.svg';
import Thumbnail from '@site/src/components/Thumbnail';

# What is Structured Output?

Structured Output allows DronaHQ AI Agents to return responses in a predefined JSON schema. By enforcing a structured format, developers can validate agent responses, ensure type safety, and reliably send outputs to workflows, APIs, databases, automations, and business applications.

Common use cases include:

- Sentiment analysis
- Appointment booking
- Lead qualification
- Conversation summarization
- Customer support automation
- Extracting structured data from natural language conversations

### Overview

| Field | Description |
|---------|-------------|
| Name | The unique identifier for the structured output schema. |
| Linked Agents | The AI agents assigned to utilize this specific schema for their responses. |
| Evaluation Type | Dictates how the schema is evaluated against the agent's raw output. |
| Updated | Timestamp indicating when the schema configuration was last modified. |

## Creation Workflow

You can define your schema using one of two methods:

### 1. Create from Scratch

Build a completely custom structured output by defining your own schema from the ground up using the supported data types.

### Configuration Section

| Section | Fields | Description |
|----------|---------|-------------|
| **Schema** | Name, Description, Schema Type, Instructions | Defines the JSON structure, data types (Boolean, String, Number, Integer, Array, Object), and extraction rules for the AI response. |
| **Advanced Settings** | Model, Temperature, Max Tokens | Configures the LLM parameters. Lower temperature values help produce more consistent and predictable structured outputs. |
| **Test** | Tracing Run ID | Tests the schema against a live or historical execution to preview the generated JSON output. |

### Schema Fields

When building your custom schema, you must define the following foundational fields:

1. **Name:** The unique, system-level identifier for the Structured Output attribute. This name will be used as the JSON key in the final payload object.

2. **Description:** A clear text explanation detailing what data this specific field is expected to extract or evaluate. This acts as metadata context for both developers and the AI engine.

3. **Schema Type:** The explicit data type that the agent's output must conform to.
   
   **Supported Types:**

- **Boolean**: Enforces a true/false binary value. Ideal for flags like Success Evaluation or Appointment Booked.
- **String**: Enforces text-based outputs. Ideal for Sentiment Detection or text Summarization.
- **Number / Integer**: Enforces numerical data values. Ideal for User Ratings or counts.
- **Object**: Allows you to nest multiple sub-fields together. Ideal for multi-layered data like Insurance Renewal details.
- **Array**: Enforces a structured list of items. Ideal for sequence tracking like an E-Commerce Cart.

### 2. Use Templates

Accelerate development by selecting from pre-configured industry templates.

### Available Templates

| Template | Data Type | Description |
|-----------|----------|-------------|
| User Rating | Number / Integer | Represents the user's satisfaction level based on conversation tone, sentiment, resolution quality, and overall experience. |
| Success Evaluation | Boolean | Measures interaction success based on expected outcomes (Pass/Fail). |
| Appointment Booked | Boolean | Tracks successful appointment bookings from customer chat. |
| Sentiment Detection | String | Determines the emotional tone (frustration, satisfaction, urgency, politeness). Strictly classified as: Positive, Neutral, or Negative. |
| Summarization | String | Generates a concise and clear summary capturing the user's main intent, key details, and final outcome. Must be human-readable. |
| Insurance Renewal | Object | Extracts and structures nested policy details, renewal intent, payment status, and next actions. |
| E-Commerce Cart | Array | A structured list tracking product actions inside an e-commerce flow. |

## FAQs

<details>
<summary><strong>What is Structured Output?</strong></summary>

Structured Output lets you define JSON schemas to ensure AI agent responses are predictable, validated, and type-safe.

</details>

<details>
<summary><strong>How can I create a Structured Output schema?</strong></summary>

You can either create a custom schema from scratch or use a pre-built template.

</details>

<details>
<summary><strong>What data types are supported in Structured Output?</strong></summary>

Supported types are Boolean, String, Number/Integer, Object, and Array.

</details>

<details>
<summary><strong>What is the purpose of the Evaluation Type field?</strong></summary>

It determines how the schema is validated against the agent's raw output.

</details>

<details>
<summary><strong>What are templates used for?</strong></summary>

Templates provide pre-configured schemas for common use cases like sentiment detection, summarization, user ratings, and appointment booking.

</details>